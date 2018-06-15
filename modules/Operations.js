module.exports = function () {
    
        var opers = {
    
    
            //select all - zwraca tablicę pasujących dokumentów
    
            SelectAll: function (collection, callback) {
                collection.find({}).toArray(function (err, items) {
                    if (err) {
                        console.log(err);
                    } else {
                        var outcome = { documents: items }
                        callback(outcome);
                    }
    
                    //return items;
                });
            },
    
            SelectAndLimit: function (collection, callback) {
                collection.find({ login: "test" }).toArray(function (err, items) {
                    if (err) {
                        console.log(err);
                    } else {
                        callback(items);
                    }
                });
            },
            Insert: function (collection, data, callback) {
                var that = this;
                collection.insert(data, function (err, result) {
                    if (err) {
                        console.log(err)
                    } else {
                        that.SelectAll(collection, callback);
                    }
                });
            },
            DeleteById: function (ObjectID, collection, id, callback) {
                var that = this;
                collection.remove({ _id: ObjectID(id) }, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        that.SelectAll(collection, callback);
                    }
                })
            },
            UpdateById: function (ObjectID, collection, id, newData, callback) {
                var that = this;
                //collection.update({_id:"123"}, {author:"Jessica", title:"Mongo facts"});
                collection.updateOne({ _id: ObjectID(id) }, { $set: newData },
                    function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            that.SelectAll(collection, callback);
                        }
                    })
            },
            ShowDbs: function (db, callback) {
                db.admin().listDatabases(function (err, dbs) {
                    if (err) {
                        console.log(err)
                    } else {
                        var _dbs = dbs;
                        for (var i = 0; i < _dbs.databases.length; i++) {
                            var name = _dbs.databases[i].name;
                            if (name == "admin" || name == "local" || name == "config") {
                                _dbs.databases.splice(i, 1);
                            }
                        }
                        callback(_dbs)
                        // uwaga: podczas projektowania aplikacji proszę wykluczyć 
                        // z listy systemowe bazy danych: admin, local, config                  
                    }
    
                })
            },
    
            ShowColls: function (db, callback) {
                db.collections(function (err, colls) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(colls)
                        var output = [];
                        for (var i = 0; i < colls.length; i++) {
                            output.push(colls[i].s.name)
                        }
                        var output = { collections: output }
                        callback(output)
                        // uwaga: podczas projektowania aplikacji proszę wykluczyć 
                        // z listy systemowe bazy danych: admin, local, config                  
                    }
    
                })
            }
    
    
            //db.collections działa ale jest problem z konwersją
    
    
            // update - aktualizacja poprzez id - uwaga na ObjectID
            // uwaga: bez $set usuwa poprzedni obiekt i wstawia nowy
            // z $set - dokunuje aktualizacji tylko wybranego pola
    
    
    
        }
    
    
        return opers;
    
    }