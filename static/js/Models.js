function _Models() {
    var toilet;
    var wcaleNieBoiler;
    //MODELE
    var loader = new THREE.JSONLoader();
    var modelMaterial = new THREE.MeshPhongMaterial(
        {
            map: THREE.ImageUtils.loadTexture("mats/toilet.png"),
            morphTargets: true // odpowiada za animację materiału modelu

        });
    loader.load('http://yourjavascript.com/12528144625/toilet.js', function (geometry) {
        meshModel = new THREE.Mesh(geometry, modelMaterial)
        meshModel.name = "toliet";
        meshModel.rotation.y = Math.PI
        toilet = meshModel;
    });
    this.getToilet = function () {
        if (Sett.difficulty == "easy") {
            toilet.position.set(-475, -23, 350);
        }
        else if (Sett.difficulty == "medium") {
            toilet.position.set(-525, -23, 400);
        }
        else {
            toilet.position.set(-575, -23, 450);
        }
        toilet.scale.set(6, 6, 6);
        return toilet; //dodaj do sceny
    }

    var modelMaterial2 = new THREE.MeshPhongMaterial(
        {
            map: THREE.ImageUtils.loadTexture("mats/oiltank.png"),
            morphTargets: true // odpowiada za animację materiału modelu

        });
    loader.load('http://yourjavascript.com/62821512458/oiltank.js', function (geometry) {

        meshModel = new THREE.Mesh(geometry, modelMaterial2)
        meshModel.name = "toliet";
        meshModel.rotation.y = Math.PI / 2; // ustaw obrót modelu
        wcaleNieBoiler = meshModel;
    });
    this.getWcaleNieBoiler = function () {
        if (Sett.difficulty == "easy") {
            wcaleNieBoiler.position.set(-350, -23, -540);
        }
        else if (Sett.difficulty == "medium") {
            wcaleNieBoiler.position.set(-400, -23, -590);
        }
        else {
            wcaleNieBoiler.position.set(-350, -23, -640);
        }
        wcaleNieBoiler.scale.set(1.5, 1.5, 1.5);
        return wcaleNieBoiler; //dodaj do sceny
    }
}