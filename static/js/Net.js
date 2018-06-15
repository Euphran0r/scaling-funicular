function _Net() {
    this.client = io();//dostęp dla innych plików
    var client = this.client;

    this.sendMove = function (x, y, val3, val4) {
        var data = {
            y: y,
            x: x,
            in: val3,
            out: val4
        }
        ////console.log("wysyłam", data)
        client.emit("move", data);
    }
    this.rekord = function (nick, czas, diff) {
        orbitControl.enabled = false//todo ło cie chuj nie wiem za bardzo co z tym zrobić
        Sett.raycaster_true = false;
        Sett.czy_liczyc = false
        document.getElementById("nowy").style.display = "block"
        $("#submit").click(function () {
            var nick2 = document.getElementById("nick_gracza").value
            console.log(nick2)
            client.emit("record", { nazwa: nick2, time: czas, diff: diff });
            document.getElementById("nowy").style.display = "none"
        });
    }
    this.stop_timer = function () {
        Sett.czy_liczyc = false;
        Sett.raycaster_true = false; 0
        orbitControl.enabled = false //todo ło cie chuj nie wiem za bardzo co z tym zrobić
    }
    client.on("restarcik", function (data) {
        console.log("restart")
        window.location.reload(false);
    })
    client.on("newrecord", function (data) {
        document.getElementById("nowy").style.display = "none"
        console.log(data)
        var byDate = data.documents.slice(0);
        byDate.sort(function (a, b) {
            return a.time - b.time;
        });
        console.log('by time:');
        console.log(byDate);
        var rekordy = document.getElementById("rekordy")
        document.getElementById("rekordy").style.display = "block"
        if (byDate.length >= 5) {
            for (var jk = 0; jk < 5; jk++) {
                var para = document.createElement("h1");
                para.className = "rekord"
                para.innerText = jk + 1 + ". " + byDate[jk].nazwa + " " + byDate[jk].time + "s"
                rekordy.appendChild(para)

            }
        }
        else {
            for (var jk = 0; jk < byDate.length; jk++) {
                var para = document.createElement("h1");
                para.className = "rekord"
                para.innerText = jk + 1 + ". " + byDate[jk].nazwa + " " + byDate[jk].time + "s"
                rekordy.appendChild(para)
              

            }

        }
        
        var button = document.createElement("button");
        button.setAttribute.onClick=""
        button.id = "restart"
        button.innerText = "Zrestartuj grę"
        rekordy.appendChild(button)
        button.setAttribute('onclick', "Net.client.emit('restart', 'kuba_hej');");

       

    })
    client.on("waitDiff", function () {
        document.getElementById("alt_mode").style.display = "none"

        document.getElementById("mode").style.display = "block"
        document.getElementById("mode").innerHTML = "<h1 id='komunikat'>Zaczekaj, aż drugi gracz wybierze poziom trudności.</h1>"
    })
    client.on("chooseDiff", function () {
        document.getElementById("alt_mode").style.display = "none"

        document.getElementById("mode").style.display = "block"
        $("#easy").click(function () {
           
            document.getElementById("mode").style.display = "none"
            if(document.getElementById("tutorial").checked==true){
                client.emit("startGame", {diff: "easy", tutorial: true});
            }
            else{
                client.emit("startGame", {diff: "easy"});
            }
            
        });
        $("#medium").click(function () {
            console.log(document.getElementById("tutorial").checked)
            document.getElementById("mode").style.display = "none"
            if(document.getElementById("tutorial").checked==true){
                client.emit("startGame", {diff: "medium", tutorial: true});
            }
            else{
                client.emit("startGame", {diff: "medium"});
            }
            
        });
        $("#extreme").click(function () {
            console.log(document.getElementById("tutorial").checked)
            document.getElementById("mode").style.display = "none"
            if(document.getElementById("tutorial").checked==true){
                client.emit("startGame", {diff: "extreme", tutorial: true});
            }
            else{
                client.emit("startGame", {diff: "extreme"});
            }
            
            //przeszyła wybraną trudność, serwer dodaje mapę od siebie
           
        });

    });
    client.on("startGame", function (data) {
        document.getElementById("mode").style.display = "none"
        document.getElementById("logo").style.display="none"
        Sett.difficulty = data.difficulty;
        Sett.map = data.map;
        Sett.color = data.color;
        Sett.direct = data.direct;
        Sett.player = data.player;
        Sett.tutorial = data.tutorial;
        Game.startGame(data)
    });
    client.on("move", function (data) {
        ////console.log("odbieram", data)
        for (var i = 0; i < Sett.kontenery.length; i++) {
            if (Sett.kontenery[i].userData.y == data.y && Sett.kontenery[i].userData.x == data.x) {
                var moved = Sett.kontenery[i];
                if (moved.userData.type == "straight") {
                    if (moved.userData.position == 1) {
                        moved.userData.position = 2
                        moved.userData.in = 1
                        moved.userData.out = 3
                        moved.rotation.y = Math.PI / 2
                        ////console.log("x: " + moved.userData.x + " y: " + moved.userData.y + " in: " + moved.userData.in + " out: " + moved.userData.out)
                    }
                    else {
                        moved.userData.position = 1
                        moved.userData.in = 2
                        moved.userData.out = 4
                        moved.rotation.y = 0
                        ////console.log("x: " + moved.userData.x + " y: " + moved.userData.y + " in: " + moved.userData.in + " out: " + moved.userData.out)
                    }
                }
                else {
                    if (moved.userData.position == 1) {
                        //moved.userData = { name: "pipe", type: "bended", y: moved.userData.y, x: moved.userData.x, position: 4, in: 1, out: 2 }
                        moved.userData.position = 4
                        moved.userData.in = 1
                        moved.userData.out = 2
                        moved.rotation.y = -Math.PI / 2
                        ////console.log("x: " + moved.userData.x + " y: " + moved.userData.y + " in: " + moved.userData.in + " out: " + moved.userData.out)
                    }
                    else if (moved.userData.position == 2) {
                        //moved.userData = { name: "pipe", type: "bended", y: moved.userData.y, x: moved.userData.x, position: 1, in: 4, out: 1 }
                        moved.userData.position = 1
                        moved.userData.in = 4
                        moved.userData.out = 1
                        moved.rotation.y = 0
                        ////console.log("x: " + moved.userData.x + " y: " + moved.userData.y + " in: " + moved.userData.in + " out: " + moved.userData.out)
                    }
                    else if (moved.userData.position == 3) {
                        //moved.userData = { name: "pipe", type: "bended", y: moved.userData.y, x: moved.userData.x, position: 2, in: 3, out: 4 }
                        moved.userData.position = 2
                        moved.userData.in = 3
                        moved.userData.out = 4
                        moved.rotation.y = 3 * (-Math.PI / 2)
                        ////console.log("x: " + moved.userData.x + " y: " + moved.userData.y + " in: " + moved.userData.in + " out: " + moved.userData.out)
                    }
                    else if (moved.userData.position == 4) {
                        //moved.userData = { name: "pipe", type: "bended", y: moved.userData.y, x: moved.userData.x, position: 3, in: 2, out: 3 }
                        moved.userData.position = 3
                        moved.userData.in = 2
                        moved.userData.out = 3
                        moved.rotation.y = -2 * Math.PI / 2
                        ////console.log("x: " + moved.userData.x + " y: " + moved.userData.y + " in: " + moved.userData.in + " out: " + moved.userData.out)
                    }
                    ////console.log("x: " + moved.userData.x + " y: " + moved.userData.y + " in: " + moved.userData.in + " out: " + intersects[0].object.parent.userData.out)

                }

            }
        }
        Game.checkWinCond(Sett.sprawdzanie);
    })
    client.on("stoper_start", function (data) {
        console.log(data)
        Sett.timer = data.czas
        Sett.czy_liczyc = true;
        if (Sett.player == "blue") {
            document.getElementById("stan").style.backgroundColor = "#a8d1ff"
            document.getElementById("kolor").innerText = "Gracz: niebieski"
            document.getElementById("difff").innerText = "Poziom trudnośći: " + Sett.difficulty
        }
        else {
            document.getElementById("stan").style.backgroundColor = "#ffa8bc"
            document.getElementById("timer").style.backgroundColor = "#ffa8bc"
            document.getElementById("kolor").innerText = "Gracz: czerwony"
            document.getElementById("difff").innerText = "Poziom trudnośći: " + Sett.difficulty
        }

        document.getElementById("timer").style.display = "block"

        document.getElementById("stan").style.display = "block"
        console.log(Sett.timer)
    })
}