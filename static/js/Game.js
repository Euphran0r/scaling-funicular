function _Game() {
    $("#restart").click(function () {
        console.log("XD")
        Net.client.emit("restart", "kuba_hej");
    });
    //----
    //podstawowe działania 3d
    //----
    var intersects
    var scene = new THREE.Scene();
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D
    var camera = new THREE.PerspectiveCamera(
        45, // kąt patrzenia kamery (FOV - field of view)
        $(window).width() / $(window).height(), // proporcje widoku, powinny odpowiadać proporjom naszego ekranu przeglądarki
        0.1, // minimalna renderowana odległość
        10000 // maxymalna renderowana odległość
    );
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0xd1e2ba);
    renderer.setSize($(window).width(), $(window).height());
    $("#root").append(renderer.domElement);

    camera.position.set(1000, 800, 0)
    camera.lookAt(scene.position);

    //ORBIT CONTROLS
    orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.addEventListener('change', function () {
      
            renderer.render(scene, camera)
        

        
    });
    //RAYCASTER
    var raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
    var mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D




    //---
    //modele i tekstury
    //---

    var geometria_bended_pipe = new THREE.TorusBufferGeometry(50, 15, 100, 100, Math.PI * 2 / 4);
    //geometria_bended_pipe.translate(0, 0, 0)
    var material_bended_pipe = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('./mats/pipe.jpg'),
        transparent: false,
    })
    var geometria_straight_pipe = new THREE.CylinderGeometry(15, 15, 100, 32);
    var material_straight_pipe = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('./mats/pipe.jpg'),
        transparent: false,
    })
    var geometria_kafelek = new THREE.BoxGeometry(100, 10, 100);
    var material_kafelek = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('./mats/grey.jpg'),
        transparent: false,
    })
    var material_kafelek_czerwony = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('./mats/red.jpg'),
        transparent: false,
    })
    var material_kafelek_niebieski = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
        map: new THREE.TextureLoader().load('./mats/blue.jpg'),
        transparent: false,
    })
//a to do materiałów koło 68 w Game
var material_won = new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: new THREE.TextureLoader().load('./mats/pipe.jpg'),
    transparent: false,
    color:0x00ffff
})


    //światło
    var light = new THREE.DirectionalLight(0xeeeeee);
    light.position.set(1000, 1100, 0);
    scene.add(light)


    function kolory() {
        var colorCounter = 0;
        if (Sett.difficulty == "easy") {
            var wylosowane_1 = 0
            var wylosowane_2 = 0
            for (var xd = 0; xd < Sett.kafelki.length; xd++) {
                var y = Sett.kafelki[xd].userData.y
                var x = Sett.kafelki[xd].userData.x
                if (Sett.easy[y][x] == 1 || Sett.easy[y][x] == 2) {
                    var los = Sett.color[colorCounter]
                    colorCounter++

                    if (wylosowane_1 < 21 && wylosowane_2 < 21) {
                        if (los == 1) {
                            Sett.kafelki[xd].material = material_kafelek_czerwony
                            Sett.kafelki[xd].userData.color = "red"
                            wylosowane_1++
                        }
                        else if (los == 2) {
                            Sett.kafelki[xd].material = material_kafelek_niebieski
                            Sett.kafelki[xd].userData.color = "blue"
                            wylosowane_2++
                        }
                    }
                    else {
                        if (wylosowane_1 < 19) {
                            Sett.kafelki[xd].material = material_kafelek_czerwony
                            Sett.kafelki[xd].userData.color = "red"
                        }
                        else {
                            Sett.kafelki[xd].material = material_kafelek_niebieski
                            Sett.kafelki[xd].userData.color = "blue"
                        }
                    }

                }
            }
        } else if (Sett.difficulty == "medium") {
            var wylosowane_1 = 0
            var wylosowane_2 = 0
            for (var xd = 0; xd < Sett.kafelki.length; xd++) {
                var y = Sett.kafelki[xd].userData.y
                var x = Sett.kafelki[xd].userData.x
                if (Sett.medium[y][x] == 1 || Sett.medium[y][x] == 2) {
                    var los = Sett.color[colorCounter]
                    colorCounter++
                    if (wylosowane_1 < 23 && wylosowane_2 < 23) {
                        if (los == 1) {
                            Sett.kafelki[xd].material = material_kafelek_czerwony
                            Sett.kafelki[xd].userData.color = "red"
                            wylosowane_1++
                        }
                        else if (los == 2) {
                            Sett.kafelki[xd].material = material_kafelek_niebieski
                            Sett.kafelki[xd].userData.color = "blue"
                            wylosowane_2++
                        }
                    }
                    else {
                        if (wylosowane_1 < 19) {
                            Sett.kafelki[xd].material = material_kafelek_czerwony
                            Sett.kafelki[xd].userData.color = "red"
                        }
                        else {
                            Sett.kafelki[xd].material = material_kafelek_niebieski
                            Sett.kafelki[xd].userData.color = "blue"
                        }
                    }

                }
            }
        } else if (Sett.difficulty == "extreme") {
            var wylosowane_1 = 0
            var wylosowane_2 = 0
            for (var xd = 0; xd < Sett.kafelki.length; xd++) {
                var y = Sett.kafelki[xd].userData.y
                var x = Sett.kafelki[xd].userData.x
                if (Sett.extreme[y][x] == 1 || Sett.extreme[y][x] == 2) {
                    var los = Sett.color[colorCounter]
                    colorCounter++
                    if (wylosowane_1 < 33 && wylosowane_2 < 33) {
                        if (los == 1) {
                            Sett.kafelki[xd].material = material_kafelek_czerwony
                            Sett.kafelki[xd].userData.color = "red"
                            wylosowane_1++
                        }
                        else if (los == 2) {
                            Sett.kafelki[xd].material = material_kafelek_niebieski
                            Sett.kafelki[xd].userData.color = "blue"
                            wylosowane_2++
                        }
                    }
                    else {
                        if (wylosowane_1 < 19) {
                            Sett.kafelki[xd].material = material_kafelek_czerwony
                            Sett.kafelki[xd].userData.color = "red"
                        }
                        else {
                            Sett.kafelki[xd].material = material_kafelek_niebieski
                            Sett.kafelki[xd].userData.color = "blue"
                        }
                    }

                }
            }
        }
    }
    function generowac() {
        var directCounter = 0;
        var id = 0;
        if (Sett.difficulty == "easy") {
            for (var mx = 0; mx < 8; mx++) {
                for (var xm = 0; xm < 8; xm++) {
                    var container = new THREE.Object3D();
                    var kafelek = new THREE.Mesh(geometria_kafelek, material_kafelek);
                    kafelek.userData = { name: "title", y: mx, x: xm }
                    container.add(kafelek)
                    container.position.set(-350 + mx * 100, -23, 350 - xm * 100)
                    Sett.kafelki.push(kafelek)

                    if (Sett.easy[mx][xm] == 1) {

                        var los = Sett.direct[directCounter] % 2 + 1
                        directCounter++;
                        if (los == 1) {
                            var straight_pipe = new THREE.Mesh(geometria_straight_pipe, material_straight_pipe);
                            container.add(straight_pipe);
                            straight_pipe.position.set(0, 23, 0)
                            straight_pipe.rotation.x = (Math.PI / 2);
                            Sett.rury.push(straight_pipe)
                            scene.add(container)
                            container.userData = { name: "pipe", type: "straight", y: mx, x: xm, position: 1, in: 4, out: 2 };

                        }
                        else {
                            var straight_pipe = new THREE.Mesh(geometria_straight_pipe, material_straight_pipe);
                            container.add(straight_pipe);
                            straight_pipe.position.set(0, 23, 0)
                            straight_pipe.rotation.x = (Math.PI / 2);
                            container.rotation.y = Math.PI / 2
                            Sett.rury.push(straight_pipe)
                            scene.add(container)
                            container.userData = { name: "pipe", type: "straight", y: mx, x: xm, position: 2, in: 1, out: 3 };
                        }
                        Sett.kontenery.push(container)
                    }
                    else if (Sett.easy[mx][xm] == 2) {
                        var los = Sett.direct[directCounter]
                        directCounter++
                        if (los == 1) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 1, in: 4, out: 1 }
                        }
                        else if (los == 2) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 4, in: 1, out: 2 }

                        }
                        else if (los == 3) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -2 * Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 3, in: 2, out: 3 }
                        }
                        else if (los == 4) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -3 * Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 2, in: 3, out: 4 }


                        }
                        Sett.kontenery.push(container)
                    }

                    else {
                        scene.add(container)
                        container.userData = { name: "title", y: mx, x: xm }
                    }
                    Sett.sprawdzanie.push(container)
                    container.userData.id = id;
                    id++;
                }
            }
            kolory()
            ////console.log(Sett.kafelki)
            ////console.log(Sett.rury)
        } else if (Sett.difficulty == "medium") {
            for (var mx = 0; mx < 9; mx++) {
                for (var xm = 0; xm < 9; xm++) {
                    var container = new THREE.Object3D();

                    var kafelek = new THREE.Mesh(geometria_kafelek, material_kafelek);

                    kafelek.userData = { name: "title", y: mx, x: xm }

                    container.add(kafelek)
                    container.position.set(-400 + mx * 100, -23, 400 - xm * 100)

                    Sett.kafelki.push(kafelek)
                    if (Sett.medium[mx][xm] == 1) {

                        var los = Sett.direct[directCounter] % 2 + 1
                        directCounter++;
                        if (los == 1) {
                            var straight_pipe = new THREE.Mesh(geometria_straight_pipe, material_straight_pipe);

                            container.add(straight_pipe);
                            straight_pipe.position.set(0, 23, 0)
                            straight_pipe.rotation.x = (Math.PI / 2);
                            Sett.rury.push(straight_pipe)
                            scene.add(container)
                            container.userData = { name: "pipe", type: "straight", y: mx, x: xm, position: 1, in: 4, out: 2 };

                        }
                        else {
                            var straight_pipe = new THREE.Mesh(geometria_straight_pipe, material_straight_pipe);
                            container.add(straight_pipe);
                            straight_pipe.position.set(0, 23, 0)
                            straight_pipe.rotation.x = (Math.PI / 2);
                            container.rotation.y = Math.PI / 2

                            Sett.rury.push(straight_pipe)
                            scene.add(container)
                            container.userData = { name: "pipe", type: "straight", y: mx, x: xm, position: 2, in: 1, out: 3 };
                        }

                        Sett.kontenery.push(container)
                    }
                    else if (Sett.medium[mx][xm] == 2) {
                        var los = Sett.direct[directCounter]
                        directCounter++
                        if (los == 1) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 1, in: 4, out: 1 }
                        }
                        else if (los == 2) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 4, in: 1, out: 2 }

                        }
                        else if (los == 3) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -2 * Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 3, in: 2, out: 3 }
                        }
                        else if (los == 4) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -3 * Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 2, in: 3, out: 4 }


                        }
                        Sett.kontenery.push(container)
                    }
                    else {
                        scene.add(container)
                        container.userData = { name: "title", y: mx, x: xm }

                    }
                    Sett.sprawdzanie.push(container)
                    container.userData.id = id;
                    id++;
                }
            }
            kolory()
            ////console.log(Sett.kafelki)
            ////console.log(Sett.rury)
        } else if (Sett.difficulty == "extreme") {
            for (var mx = 0; mx < 10; mx++) {
                for (var xm = 0; xm < 10; xm++) {
                    var container = new THREE.Object3D();

                    var kafelek = new THREE.Mesh(geometria_kafelek, material_kafelek);

                    kafelek.userData = { name: "title", y: mx, x: xm }

                    container.add(kafelek)
                    container.position.set(-450 + mx * 100, -23, 450 - xm * 100)

                    Sett.kafelki.push(kafelek)
                    if (Sett.extreme[mx][xm] == 1) {

                        var los = Sett.direct[directCounter] % 2 + 1
                        directCounter++;
                        if (los == 1) {
                            var straight_pipe = new THREE.Mesh(geometria_straight_pipe, material_straight_pipe);

                            container.add(straight_pipe);
                            straight_pipe.position.set(0, 23, 0)
                            straight_pipe.rotation.x = (Math.PI / 2);
                            Sett.rury.push(straight_pipe)
                            scene.add(container)
                            container.userData = { name: "pipe", type: "straight", y: mx, x: xm, position: 1, in: 4, out: 2 };

                        }
                        else {
                            var straight_pipe = new THREE.Mesh(geometria_straight_pipe, material_straight_pipe);
                            container.add(straight_pipe);
                            straight_pipe.position.set(0, 23, 0)
                            straight_pipe.rotation.x = (Math.PI / 2);
                            container.rotation.y = Math.PI / 2
                            Sett.rury.push(straight_pipe)
                            scene.add(container)
                            container.userData = { name: "pipe", type: "straight", y: mx, x: xm, position: 2, in: 1, out: 3 };
                        }

                        Sett.kontenery.push(container)

                    }
                    else if (Sett.extreme[mx][xm] == 2) {
                        var los = Sett.direct[directCounter]
                        directCounter++
                        if (los == 1) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 1, in: 4, out: 1 }
                        }
                        else if (los == 2) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 4, in: 1, out: 2 }

                        }
                        else if (los == 3) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -2 * Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 3, in: 2, out: 3 }
                        }
                        else if (los == 4) {
                            var bended_pipe = new THREE.Mesh(geometria_bended_pipe, material_bended_pipe);
                            container.add(bended_pipe);
                            scene.add(container)
                            container.rotation.y = -3 * Math.PI / 2
                            bended_pipe.rotation.x = (-Math.PI / 2)
                            bended_pipe.position.set(-50, 23, 50)
                            Sett.rury.push(bended_pipe)
                            container.userData = { name: "pipe", type: "bended", y: mx, x: xm, position: 2, in: 3, out: 4 }


                        }
                        Sett.kontenery.push(container)
                    }
                    else {
                        scene.add(container)
                        container.userData = { name: "title", y: mx, x: xm }

                    }
                    Sett.sprawdzanie.push(container)
                    container.userData.id = id;
                    id++;
                }
            }
            kolory()
            ////console.log(Sett.kafelki)
            ////console.log(Sett.rury)
        }
        //console.log("Sett.sprawdzanie ", Sett.sprawdzanie)
       var toilet = Models.getToilet();
       var gasTank = Models.getWcaleNieBoiler();
       scene.add(toilet);
     scene.add(gasTank)

    }
    function rotate(moved) {
        if (moved.userData.type == "straight") {
            if (moved.userData.position == 1) {
                moved.userData.position = 2
                moved.userData.in = 1
                moved.userData.out = 3
                moved.rotation.y = Math.PI / 2
            }
            else {
                moved.userData.position = 1
                moved.userData.in = 2
                moved.userData.out = 4
                moved.rotation.y = 0
            }
        }
        else {
            if (moved.userData.position == 1) {
                moved.userData.position = 4
                moved.userData.in = 1
                moved.userData.out = 2
                moved.rotation.y = -Math.PI / 2
            }
            else if (moved.userData.position == 2) {
                moved.userData.position = 1
                moved.userData.in = 4
                moved.userData.out = 1
                moved.rotation.y = 0
            }
            else if (moved.userData.position == 3) {
                moved.userData.position = 2
                moved.userData.in = 3
                moved.userData.out = 4
                moved.rotation.y = 3 * (-Math.PI / 2)
            }
            else if (moved.userData.position == 4) {
                moved.userData.position = 3
                moved.userData.in = 2
                moved.userData.out = 3
                moved.rotation.y = -2 * Math.PI / 2
            }

        }
    }


    function checkWinCond(sprawdzanie) {
        var size = Math.sqrt(sprawdzanie.length)
        var currentDirect, goalX, goalY;
        switch (size) {
            case 8:
                goalX = 8;
                goalY = 0;
                break;
            case 9:
                goalX = 9;
                goalY = 0;
                break;
            case 10:
                goalX = 10;
                goalY = 1;
                break;
        }
        var currY = 0
        var currX = 0
        var prevDirect = 3

        while (currY != goalY || currX != goalX) {
            switch (prevDirect) {
                case 1:
                    currentDirect = 3;
                    break;
                case 2:
                    currentDirect = 4;
                    break;
                case 3:
                    currentDirect = 1;
                    break;
                case 4:
                    currentDirect = 2;
                    break;
            }
            if (currY >= 0 && currY < size && currX >= 0 && currX < size) {
                var currentIndex = currY * size + currX
                var inn = sprawdzanie[currentIndex].userData.in
                var out = sprawdzanie[currentIndex].userData.out
                if (inn == currentDirect) {
                    Sett.sprawdzone.push(sprawdzanie[currentIndex])
                    switch (out) {
                        case 1:
                            currY--;
                            break;
                        case 2:
                            currX++
                            break;
                        case 3:
                            currY++
                            break;
                        case 4:
                            currX--
                            break;

                    }
                    prevDirect = out;

                } else if (out == currentDirect) {
                    Sett.sprawdzone.push(sprawdzanie[currentIndex])
                    switch (inn) {
                        case 1:
                            currY--;
                            break;
                        case 2:
                            currX++
                            break;
                        case 3:
                            currY++
                            break;
                        case 4:
                            currX--
                            break;

                    }
                    prevDirect = inn;
                } else {
                    console.log("skończyłem szukać, rura " + currY + " " + currX + " jest źle ustawiona")
                    Sett.sprawdzone = [];
                    break;
                }
                console.log("rura " + currY + " " + currX + " jest ok ")
            } else {
                Sett.sprawdzone = [];
                break;
            }
        }
        if (currY == goalY && currX == goalX) {
            console.log("w sumie zaskoczyło, wygrało.", Sett.sprawdzone)
            Sett.czy_liczyc = false;
            var iaoisujd = 0;
            var kolorowanieRur = setInterval(function () {
                if (Sett.sprawdzone[iaoisujd]) {
                    Sett.sprawdzone[iaoisujd].children[1].material = material_won;//material_won
                }
                else {
                    clearInterval(kolorowanieRur);
                    if (Sett.player == "blue")
                        Net.rekord("mama_pawla", czas, Sett.difficulty)
                        else if (Sett.player == "red") {
                            orbitControl.enabled = false//todo ło cie chuj nie wiem za bardzo co z tym zrobić
                            Sett.raycaster_true = false;
                            document.getElementById("nowy").innerHTML = "<h1 id='komunikat'>Drugi gracz dodaje rekord.</h1>"
                            document.getElementById("nowy").style.display = "block"
                            Net.stop_timer();
                        }
                }
                iaoisujd++
            }, 100)


        }
    


    }
    this.checkWinCond = function () {//dostęp z pozostałych plików 
        checkWinCond(Sett.sprawdzanie)
    }

    function render() {
        if (Sett.czy_liczyc == true) {
            console.log(Sett.timer)
            czas = (Date.now() / 1000 - Sett.timer)
            czas = czas.toFixed(1);
            document.getElementById("czas").innerText = czas
        }
        camera.aspect = $(window).width() / $(window).height();
        camera.updateProjectionMatrix();
        renderer.setSize($(window).width(), $(window).height());
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
    var samouczek = function() {
        var cel_gry =  document.getElementById("cel_gry")
        cel_gry.style.display = "block"
        cel_gry.setAttribute('onclick', "document.getElementById('cel_gry').style.display='none'");
        var sterowanie =  document.getElementById("sterowanie")
        sterowanie.style.display = "block"
        sterowanie.setAttribute('onclick', "document.getElementById('sterowanie').style.display='none'");
        var czas_pomoc =  document.getElementById("czas_pomoc")
        czas_pomoc.style.display = "block"
        czas_pomoc.setAttribute('onclick', "document.getElementById('czas_pomoc').style.display='none'");
        if(Sett.player=="blue"){
            cel_gry.style.backgroundColor = "#a8d1ff"
            sterowanie.style.backgroundColor = "#a8d1ff"
            czas_pomoc.style.backgroundColor = "#a8d1ff"
        }
        else{
            cel_gry.style.backgroundColor = "#ffa8bc"
            sterowanie.style.backgroundColor = "#ffa8bc"
            czas_pomoc.style.backgroundColor = "#ffa8bc"
        }
    }
    this.startGame = function () {

        $(document).mousedown(function (event) {
            if (Sett.raycaster_true == true) {
                mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
                mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
                raycaster.setFromCamera(mouseVector, camera);
                intersects = raycaster.intersectObjects(scene.children, true);
                if (intersects.length > 0) {
                    if (intersects[0].object.parent.children[0].userData.color == Sett.player) {
                        if (intersects[0].object.parent.userData.name == "pipe") {
                            var moved = intersects[0].object.parent
                            rotate(moved);
                            Net.sendMove(moved.userData.x, moved.userData.y, moved.userData.in, moved.userData.out)
                            checkWinCond(Sett.sprawdzanie);
                        }

                    }
                }
            }
        })




        setTimeout(function () {
            generowac();
            console.log(Sett.tutorial)
            if(Sett.tutorial==true){
                samouczek();
            }
            if (Sett.player == "blue")
                Net.client.emit("stoper", "hej");
        }, 500)
    }
}