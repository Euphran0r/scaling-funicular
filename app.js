var http = require("http");
var qs = require("querystring");
var fs = require("fs");
const utf8 = require('utf8');
//socekts
var socketio = require("socket.io");
var Operations = require("./modules/Operations.js");
var opers = new Operations();

var mongoClient = require('mongodb').MongoClient

var ObjectID = require('mongodb').ObjectID;
var _db;
var coll;



var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":
            fs.readFile("static/index.html", function (error, data) {
                if (error) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                    res.end();
                }
                else if (req.url === "/jquery.js") {
                    fs.readFile("static/libs/jquery.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/three.js") {
                    fs.readFile("static/libs/three.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/OrbitControls.js") {
                    fs.readFile("static/js/OrbitControls.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/mats/pipe.jpg") {
                    fs.readFile("static/mats/pipe.jpg", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/mats/red.jpg") {
                    fs.readFile("static/mats/red.jpg", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/mats/blue.jpg") {
                    fs.readFile("static/mats/blue.jpg", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/mats/grey.jpg") {
                    fs.readFile("static/mats/grey.jpg", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/mats/toilet.png") {
                    fs.readFile("static/models/toilet/toilet.png", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.write(data);
                        res.end();
                    })

                }
                else if (req.url === "/models/toilet.js") {
                    fs.readFile("static/models/toilet/toilet.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/mats/oiltank.png") {
                    fs.readFile("static/models/oiltank/oiltank.png", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.write(data);
                        res.end();
                    })

                }
                else if (req.url === "/logo.png") {
                    fs.readFile("static/gfx/logo.png", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.write(data);
                        res.end();
                    })

                }
                else if (req.url === "/favicon.png") {
                    fs.readFile("static/gfx/favicon.png", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'image/png' });
                        res.write(data);
                        res.end();
                    })

                }
                else if (req.url === "/models/oiltank.js") {
                    fs.readFile("static/models/oiltank/oiltank.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/style.css") {
                    fs.readFile("static/style.css", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'text/css' });
                        res.write(data);
                        res.end();
                    })

                } else if (req.url === "/Models.js") {
                    fs.readFile("static/js/Models.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }else if (req.url === "/Settings.js") {
                    fs.readFile("static/js/Settings.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/Game.js") {
                    fs.readFile("static/js/Game.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/Net.js") {
                    fs.readFile("static/js/Net.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else if (req.url === "/Main.js") {
                    fs.readFile("static/js/Main.js", function (error, data) {
                        res.writeHead(200, { 'Content-Type': 'application/javascript' });
                        res.write(data);
                        res.end();
                    })
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                }
            });

            break;
        case "POST"://tu się mongo wrzuci
            servResponse(req, res)
            break;
    }
})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")

});

var io = socketio.listen(server);
var players = [];
io.sockets.on("connection", function (client) {

    console.log("dodano klienta:", client.id)
    console.log("stan tablicy:", players)
    //jeśli jest jeden gracz czeka na drugiego
    //jeśli dwóch, wysyła pierwszemu wybór poziomu trudności
    if (players.length < 2)
        players.push(client.id);
    if (players.length == 2) {
        io.sockets.to(players[0]).emit("chooseDiff", {});
        io.sockets.to(players[1]).emit("waitDiff", {});
    }
    //w przypadku disconnectu wyrzuca gracza, wyrzuca obydwu z sesji; wyrzucenie jednego sporo buguje
    client.on("disconnect", function () {
        //var index = players.indexOf(client.id);
        //if (index > -1)
        //    players.splice(index, 1);
        if (players.length == 2)
            players = [];
        console.log("stan tablicy:", players)
    });
    client.on("stoper", function (data) {
        console.log("XD")
        io.sockets.emit("stoper_start", { czas: Date.now() / 1000 });

    })
    client.on("restart", function (data) {
        console.log("XD")
        io.sockets.emit("restarcik", "hej");

    })
    client.on("record", function (data) {
        function callback(items) {

            console.log(items)
            io.sockets.emit("newrecord", items);
        }
        var trudnosc = data.diff
        console.log(trudnosc)
        var rekord = {
            nick: data.nazwa,
            password: data.time
        }
        mongoClient.connect("mongodb://mo7078_rekordy:Qnik1999!@mongo.ct8.pl/mo7078_rekordy", function (err, db) {
            if (err) console.log(err)
            else console.log("mongo podłączone")
            //tu można operować na utworzonej bazie danych db lub podstawić jej obiekt 
            // pod zmienną widoczną na zewnątrz    
            _db = db;

            _db.createCollection(trudnosc, function (err, coll) {

                opers.Insert(coll, data, callback)
            })
        })

    });

    client.on("startGame", function (data) {
     
        //generowanie mapy i wysłanie jej
        var colors = [], directions = [], size, map, numberOfPipes = 0;
        switch (data.diff) {
            case "easy":
                size = 8;
                map = [
                    [1, 2, 0, 0, 1, 2, 1, 1],
                    [2, 1, 2, 0, 2, 1, 0, 0],
                    [0, 0, 1, 2, 0, 2, 2, 0],
                    [0, 2, 2, 2, 1, 2, 1, 0],
                    [0, 1, 0, 1, 0, 1, 1, 0],
                    [2, 2, 1, 2, 0, 2, 2, 0],
                    [2, 1, 2, 2, 0, 2, 1, 0],
                    [0, 1, 2, 1, 1, 2, 0, 0],
                ];
                break;
            case "medium":
                size = 9
                map = [
                    [2, 1, 2, 0, 0, 0, 2, 1, 1],
                    [2, 2, 2, 2, 1, 0, 1, 0, 0],
                    [0, 1, 0, 0, 0, 2, 2, 0, 0],
                    [2, 2, 0, 2, 1, 2, 1, 0, 0],
                    [1, 0, 0, 1, 0, 0, 1, 2, 0],
                    [2, 1, 2, 2, 2, 0, 2, 2, 0],
                    [0, 2, 2, 0, 1, 1, 2, 0, 0],
                    [0, 1, 0, 1, 1, 0, 1, 0, 0],
                    [0, 2, 1, 1, 2, 2, 0, 0, 0],
                ];
                break;
            case "extreme":
                map = [
                    [1, 2, 1, 2, 0, 1, 0, 0, 0, 0],
                    [2, 2, 0, 1, 1, 2, 0, 0, 2, 1],
                    [1, 0, 2, 2, 0, 0, 0, 2, 2, 2],
                    [2, 0, 1, 0, 2, 1, 1, 2, 1, 0],
                    [2, 1, 2, 0, 1, 0, 2, 0, 1, 0],
                    [1, 0, 1, 2, 2, 1, 2, 0, 2, 2],
                    [1, 0, 2, 2, 0, 0, 1, 0, 0, 1],
                    [2, 1, 2, 0, 2, 1, 2, 1, 2, 2],
                    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [2, 1, 2, 1, 2, 0, 2, 1, 2, 0],
                ];
                size = 10
                break;
        }
        //liczenie rur
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                console.log(map[i][j])
                if (map[i][j] != 0) {
                    numberOfPipes++
                }
            }
        }
        for (var i = 0; i < numberOfPipes; i++) {
            //kierunki
            directions.push(Math.floor((Math.random() * 4) + 1))
            //kolory
            if (colors.length >= numberOfPipes / 2)
                colors.push(2)
            else
                colors.push(1)
        }
        colors = shuffle(colors)

        if(data.tutorial==true){
            io.sockets.to(players[0]).emit("startGame", {
                difficulty: data.diff,//string - easy/medium/extreme
                map: map,   //tablica z tymi, jak nie chcesz to nie uzywaj
                color: colors, //jednowymiarowa tablica z kolorami
                direct: directions,
                player: "blue",
                tutorial: true
            
            });
            io.sockets.to(players[1]).emit("startGame", {
                difficulty: data.diff,//string - easy/medium/extreme
                map: map,   //tablica z tymi, jak nie chcesz to nie uzywaj
                color: colors, //jednowymiarowa tablica z kolorami
                direct: directions,
                player: "red",
                tutorial: true

            });
        }
        else{
            io.sockets.to(players[0]).emit("startGame", {
                difficulty: data.diff,//string - easy/medium/extreme
                map: map,   //tablica z tymi, jak nie chcesz to nie uzywaj
                color: colors, //jednowymiarowa tablica z kolorami
                direct: directions,
                player: "blue",
                tutorial: false

            
            });
            io.sockets.to(players[1]).emit("startGame", {
                difficulty: data.diff,//string - easy/medium/extreme
                map: map,   //tablica z tymi, jak nie chcesz to nie uzywaj
                color: colors, //jednowymiarowa tablica z kolorami
                direct: directions,
                player: "red",
                tutorial: false

            });
        }
        
    });
    client.on("move", function (data) {
        if (players.indexOf(client.id) == 0)
            x = 1;
        else
            x = 0;
        io.sockets.to(players[x]).emit("move", data);
    });


});

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
