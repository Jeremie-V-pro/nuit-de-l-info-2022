var div = document.querySelector(".board");

var canvas = document.getElementById('board');
var ctx = canvas.getContext('2d');

var body = document.getElementsByTagName('body')[0];

var scale = 1

canvas.width = Math.floor(800 * scale);
canvas.height = Math.floor(400 * scale);

ctx.scale(scale, scale);

var mapJoue;

rect = canvas.getBoundingClientRect();
(offSetX = canvas.width / rect.width),
(offSetY = canvas.height / rect.height);

canvas.addEventListener("click",(event) => {
    let x = (event.x - rect.left) * offSetX;
    let y = (event.y - rect.top) * offSetY;
    let placement = mapJoue[Math.floor(((height/2)*y) / canvas.height)][Math.floor((height*x) / canvas.width)];
    if (placement === "p"){
        removeSelectour(mapJoue);
        mapJoue[Math.floor(((height/2)*y) / canvas.height)][Math.floor((height*x) / canvas.width)] = "ps";
        drawMap(mapJoue);
    }
    if(placement === "ps"){
        mapJoue[Math.floor(((height/2)*y) / canvas.height)][Math.floor((height*x) / canvas.width)] = "p";
        drawMap(mapJoue);
    }
});


var pdv = 100;
var vide = "v"
var placement = "p";
var chemin = "c";
var joueur = "j";
var spawnEnnemie = "s";
var haut = "h"
var bas = "b"
var placementSelec = "ps";

var height = 20;


var tailleElement = canvas.width / height;

class Tour {
    //constructeur
    constructor(type) {
        
        switch (type) {
            case "cawpote":
                this.type = type;
                this.img = "../assets/CAWPOTE.png";
                this.pv = 50;
                this.atk = 2;
                this.portee = 2;
                this.estDessine = false;
                break;
            case "prep":
                this.type = type;
                this.img = "../assets/PREP.png";
                this.pv = 25;
                this.atk = 1;
                this.portee = 3;
                this.estDessine = false;
                break;
            case "prep":
                this.type = type;
                this.img = "../assets/PRESERVATIF_FEMININ.png";
                this.pv = 50;
                this.atk = 3;
                this.portee = 2;
                this.estDessine = false;
                break;
        }
    }

}

class Ennemie {
    //constructeur
    constructor(type) {
        switch (type) {
            case "virus":
                this.img = "../assets/VIRUS.png";
                this.pv = 5;
                this.atk = 50;
                this.aJoue = false;
                this.case = chemin;
                break;
        }
    }
}

class Spawner {
    //constructeur
    constructor(type) {
        switch (type) {
            case "seringue":
                this.img = "../assets/DROGUES.png";
                this.spawnRate = 2000;
                this.nbSpawn = 20;
                this.estDessine = false;
                break;
            case "rapport":
                this.img = "../assets/DROGUES.png";
                this.spawnRate = 1000;
                this.nbSpawn = 50;
                this.estDessine = false;
                break;
        }
    }

    spawn(map) {
        apparitionEnnemie(map);
        this.nbSpawn -= 1;
    }

}

var map1 = [
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "c", "c", "c", "h", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "b", "p", "v", "h", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "p", "v", "v", "v", "v", "v", "v", "b", "v", "v", "h", "v"],
    ["j", "c", "h", "v", "v", "c", "c", "c", "h", "v", "v", "v", "v", "v", "v", "b", "v", "v", "c", "s"],
    ["v", "v", "h", "v", "v", "b", "v", "v", "c", "c", "c", "c", "h", "v", "v", "b", "v", "v", "v", "v"],
    ["v", "v", "h", "v", "p", "b", "v", "v", "v", "v", "v", "p", "h", "v", "v", "b", "v", "v", "v", "v"],
    ["v", "v", "c", "c", "c", "b", "v", "v", "v", "v", "v", "v", "h", "v", "p", "b", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "c", "c", "c", "b", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v"],
];

var map2 = [
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "c", "c", "c", "c", "c", "h", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "b", "p", "v", "v", "v", "h", "v", "v", "v", "c", "c", "c", "c", "h", "v", "v"],
    ["j", "c", "c", "c", "b", "h", "v", "v", "v", "h", "v", "v", "v", "b", "v", "v", "p", "h", "v", "v"],
    ["v", "v", "v", "v", "v", "h", "p", "v", "v", "c", "c", "h", "v", "b", "v", "v", "v", "c", "c", "s"],
    ["v", "v", "v", "v", "v", "c", "h", "v", "v", "b", "v", "h", "p", "b", "c", "h", "v", "b", "v", "v"],
    ["v", "v", "v", "v", "v", "v", "c", "c", "c", "b", "v", "h", "v", "b", "v", "c", "c", "b", "v", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "c", "c", "b", "v", "v", "v", "v", "v", "v"],
    ["v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v", "v"],
];

var spawner;
var ennemies = [];
var tours = [];

var cartes = document.getElementById('cards');
var boutons = cartes.getElementsByTagName('button');

var tour;

function removeSelectour(map){
    for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
        for (var numColonne = 0; numColonne < height; numColonne++) {
            if (map[numLigne][numColonne] == "ps"){
                map[numLigne][numColonne] = "p";
            }
        }
    }
}

function init(map){
    document.getElementById('cards').setAttribute('style','visibility: visible;');
    document.getElementById('description').setAttribute('style','visibility: visible;');
    
    mapJoue = map;
        
    for(var parcoursCarte = 0; parcoursCarte<boutons.length; parcoursCarte++){
        var types = ['cawpote','prep','preservatif_feminin'];
        var type = types[Math.floor(Math.random() * types.length)];
        boutons[parcoursCarte].textContent = type;
        var img = document.createElement('img');
        img.setAttribute('src', "../assets/" + type.toUpperCase() + ".png");
        boutons[parcoursCarte].appendChild(img);
    }

    
    var intervalleMap = setInterval(function () {
        nextTick(map);
        if(pdv<=0){
            clearInterval(intervalleSpawn);
            clearInterval(intervalleMap);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.fillRect(0,0,canvas.width,canvas.height);
            ctx.drawImage(image, posx, posy, width, height);
            div.innerHTML = "";  

        }
    }, 1000);

    var intervalleSpawn = setInterval(function () {
        spawner.spawn(map);
        if(spawner.nbSpawn<=0){
            clearInterval(intervalleSpawn);
            clearInterval(intervalleMap);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
    }, 5000);

    
}

function drawImgVN(source, posx, posy, width, height, texte) {
    let image = new Image();
    image.onload = function () {
        ctx.drawImage(image, posx, posy, width, height);
        drawDialogueBox(texte);
    };
    image.src = "../assets/" + source;
}

function drawChar(character, posx, posy, width, height, texte) {
    if (character === "Jeanne") {
        drawImgVN("Character/GPG_Base.png", posx - 200, posy - 200, width * 0.25, height * 0.25, texte);
        drawImgVN("Character/GPG_Hair.png", posx - 200, posy - 200, width * 0.25, height * 0.25, texte);
        drawImgVN("Character/GPG_eye_neutral.png", posx - 200, posy - 200, width * 0.25, height * 0.25, texte);
        drawImgVN("Character/GPG_mouth_neutral.png", posx - 200, posy - 200, width * 0.25, height * 0.25, texte);
    }
}

function drawDialogueBox(texte) {
    ctx.fillStyle = "pink";
    ctx.fillRect(200, canvas.height - 100, canvas.width - 400, 75);
    ctx.fillStyle = "gray";
    ctx.font = "11px Courier New";
    ctx.fillText(texte, 250, canvas.height - 55);
}


function drawScene(background, character, texte) {
    drawImgVN(background, 0, 0, canvas.width, canvas.height, texte);
    drawChar(character, canvas.width / 2, canvas.height / 2, 1300, 2793, texte);
    ctx.beginPath();
}

let i = 0;

let background = [
    "BlackScreen.jpg",
    "NightClub.jpg",
    "NightClub.jpg",
    "NightClub.jpg",
    "NightClub.jpg",
    "NightClub.jpg",
    "NightClub.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BedRoom.jpg", 
    "BedRoom.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    "BlackScreen.jpg",
    
];

let character = [
    "",
    "Jeanne",
    "Jeanne",
    "Jeanne",
    "Jeanne",
    "Jeanne",
    "Jeanne",
    "",
    "",
    "",
    "Jeanne",
    "Jeanne",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

let texte = [
    "- Act 1 -",
    "MC : Oh t'es là toi !",
    "Jeanne : Ouais, tu passes une bonne soirée ?",
    "MC : Ouais il y a une bonne ambiance c’est cool",
    "Jeanne : Je me sens bien là,", 
    "Jeanne : ça te dit qu’on aille boire un verre ?",
    "MC : Ouais si tu veux, allons-y !",
    "Après une soirée bien festive et", 
    "de nombreuses conversations et rapprochements,",
    "vous vous retrouvez seul avec Jeanne dans un hotel...",
    "MC : On devrait se protéger non ?",
    "Jeanne : Non ça ira ne t'inquiète pas",
    "DEBUT DE LA PHASE DE COMBAT",
];

drawScene(background[i], character[i], texte[i]);
body.addEventListener("click", function () {
    if(i === 12){
        i++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        init(map1);
    }
    if (i < texte.length) {
        i++;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawScene(background[i], character[i], texte[i]);
    }
});


function drawMap(map) {
    for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
        for (var numColonne = 0; numColonne < height; numColonne++) {
            if (typeof map[numLigne][numColonne] === 'string') {
                switch (map[numLigne][numColonne]) {
                    case vide:
                        ctx.fillStyle = "green";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                        break;
                    case placement:
                        ctx.fillStyle = "green";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                        ctx.fillStyle = "blue";
                        ctx.beginPath();
                        ctx.arc((numColonne) * tailleElement + tailleElement / 2, (numLigne) * tailleElement + tailleElement / 2, 15, 0, Math.PI + (Math.PI * 2) / 2, false);
                        ctx.fill();
                        break;
                    case placementSelec:
                        ctx.fillStyle = "green";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                        ctx.fillStyle = "yellow";
                        ctx.beginPath();
                        ctx.arc((numColonne) * tailleElement + tailleElement / 2, (numLigne) * tailleElement + tailleElement / 2, 15, 0, Math.PI + (Math.PI * 2) / 2, false);
                        ctx.fill();
                        break;
                    case chemin:
                    case bas:
                    case haut:
                        ctx.fillStyle = "gray";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                        break;
                    case joueur:
                        ctx.fillStyle = "yellow";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                        ctx.fillStyle = "red";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, 5);
                        ctx.fillStyle = "lightGreen";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, (tailleElement * pdv) / 100, 5);
                        break;
                    case spawnEnnemie:
                        spawner = new Spawner("seringue");
                        map[numLigne][numColonne] = spawner;
                        break;
                }
            } else {
                if (Spawner.prototype.isPrototypeOf(map[numLigne][numColonne])) {
                    if(map[numLigne][numColonne].estDessine === false){
                        ctx.fillStyle = "gray";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                        drawImg(map[numLigne][numColonne].img, (numColonne) * tailleElement, (numLigne) * tailleElement);
                        map[numLigne][numColonne].estDessine = true;
                    }
                }
                else if (Ennemie.prototype.isPrototypeOf(map[numLigne][numColonne])) {
                    ctx.fillStyle = "gray";
                    ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                    drawImg(map[numLigne][numColonne].img, (numColonne) * tailleElement, (numLigne) * tailleElement);
                    ctx.fillStyle = "red";
                    ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, 5);
                    ctx.fillStyle = "lightGreen";
                    ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, (tailleElement * map[numLigne][numColonne].pv) / 5, 5);
                }
                else if (Tour.prototype.isPrototypeOf(map[numLigne][numColonne])) {
                    if(map[numLigne][numColonne].estDessine === false){
                        ctx.fillStyle = "green";
                        ctx.fillRect((numColonne) * tailleElement, (numLigne) * tailleElement, tailleElement, tailleElement);
                        drawImg(map[numLigne][numColonne].img, (numColonne) * tailleElement, (numLigne) * tailleElement);
                        map[numLigne][numColonne].estDessine = true;
                    }
                }
            }
        }
    }
}

function drawImg(source, posx, posy) {
    let image = new Image();
    image.onload = function () {
        ctx.drawImage(image, posx, posy, tailleElement, tailleElement);
    };
    image.src = source;
}

function apparitionEnnemie(map) {
    for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
        for (var numColonne = 0; numColonne < height; numColonne++) {
            if (Spawner.prototype.isPrototypeOf(map[numLigne][numColonne])) {
                ennemies.push(new Ennemie("virus"));
                map[numLigne][numColonne-1] = ennemies[ennemies.length - 1];
            }
        }
    }
}

function nextTick(map) {
    drawMap(map);
    nextMapState(map);
    resetEnemie(map);

    
    boutons[0].addEventListener('click',function(){
        for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
            for (var numColonne = 0; numColonne < height; numColonne++) {
                if(map[numLigne][numColonne] === placementSelec){
                    console.log(boutons[0].textContent);
                    map[numLigne][numColonne] = new Tour(boutons[0].textContent);
                    var types = ['cawpote','prep','preservatif_feminin'];
                    var type = types[Math.floor(Math.random() * types.length)];
                    boutons[0].textContent = type;
                    var img = document.createElement('img');
                    img.setAttribute('src', "../assets/" + type.toUpperCase() + ".png");
                    boutons[0].appendChild(img);
                }
            }
        }
    });
    boutons[1].addEventListener('click',function(){
        for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
            for (var numColonne = 0; numColonne < height; numColonne++) {
                if(map[numLigne][numColonne] === placementSelec){
                    console.log(boutons[1].textContent);
                    map[numLigne][numColonne] = new Tour(boutons[1].textContent);
                    var types = ['cawpote','prep','preservatif_feminin'];
                    var type = types[Math.floor(Math.random() * types.length)];
                    boutons[1].textContent = type;
                    var img = document.createElement('img');
                    img.setAttribute('src', "../assets/" + type.toUpperCase() + ".png");
                    boutons[1].appendChild(img);
                }
            }
        }
    });
    boutons[2].addEventListener('click',function(){
        for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
            for (var numColonne = 0; numColonne < height; numColonne++) {
                if(map[numLigne][numColonne] === placementSelec){
                    console.log(boutons[2].textContent);
                    map[numLigne][numColonne] = new Tour(boutons[2].textContent);
                    var types = ['cawpote','prep','preservatif_feminin'];
                    var type = types[Math.floor(Math.random() * types.length)];
                    boutons[2].textContent = type;
                    var img = document.createElement('img');
                    img.setAttribute('src', "../assets/" + type.toUpperCase() + ".png");
                    boutons[2].appendChild(img);
                }
            }
        }
    });
    boutons[3].addEventListener('click',function(){
        for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
            for (var numColonne = 0; numColonne < height; numColonne++) {
                if(map[numLigne][numColonne] === placementSelec){
                    console.log(boutons[3].textContent);
                    map[numLigne][numColonne] = new Tour(boutons[0].textContent);
                    var types = ['cawpote','prep','preservatif_feminin'];
                    var type = types[Math.floor(Math.random() * types.length)];
                    boutons[3].textContent = type;
                    var img = document.createElement('img');
                    img.setAttribute('src', "../assets/" + type.toUpperCase() + ".png");
                    boutons[3].appendChild(img);
                }
            }
        }
    });
}



function nextMapState(map) {
    for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
        for (var numColonne = 0; numColonne < height; numColonne++) {
            if (Ennemie.prototype.isPrototypeOf(map[numLigne][numColonne])) {
                if (map[numLigne][numColonne].aJoue === false) {
                    if (map[numLigne][numColonne - 1] == chemin || map[numLigne][numColonne - 1] === bas || map[numLigne][numColonne - 1] === haut) {
                        map[numLigne][numColonne].case = map[numLigne][numColonne - 1];
                        map[numLigne][numColonne].aJoue = true;
                        map[numLigne][numColonne - 1] = map[numLigne][numColonne];
                        if (map[numLigne - 1][numColonne] == bas) {
                            map[numLigne][numColonne] = bas;
                        }
                        else if (map[numLigne + 1][numColonne] == haut) {
                            map[numLigne][numColonne] = haut;
                        }
                        else {
                            map[numLigne][numColonne] = chemin;
                        }
                    }
                    else if (map[numLigne + 1][numColonne] === bas && map[numLigne - 1][numColonne] === haut) {
                        let rand = Math.floor(Math.random() * 2);
                        if (rand === 0) {
                            map[numLigne][numColonne].case = map[numLigne - 1][numColonne];
                            map[numLigne][numColonne].aJoue = true;
                            map[numLigne - 1][numColonne] = map[numLigne][numColonne];
                            map[numLigne][numColonne] = chemin;
                        }
                        else if (rand === 1) {
                            map[numLigne][numColonne].case = map[numLigne + 1][numColonne];
                            map[numLigne][numColonne].aJoue = true;
                            map[numLigne + 1][numColonne] = map[numLigne][numColonne];
                            map[numLigne][numColonne] = chemin;
                        }
                    }
                    else if (map[numLigne - 1][numColonne] === haut) {
                        map[numLigne][numColonne].case = map[numLigne - 1][numColonne];
                        map[numLigne][numColonne].aJoue = true;
                        map[numLigne - 1][numColonne] = map[numLigne][numColonne];
                        map[numLigne][numColonne] = haut;
                    }

                    else if (map[numLigne + 1][numColonne] === bas) {
                        map[numLigne][numColonne].case = map[numLigne + 1][numColonne ];
                        map[numLigne][numColonne].aJoue = true;
                        map[numLigne + 1][numColonne] = map[numLigne][numColonne];
                        map[numLigne][numColonne] = bas;
                    }

                    else if (map[numLigne][numColonne - 1] === joueur) {
                        pdv = pdv - map[numLigne][numColonne].atk;
                        map[numLigne][numColonne] = chemin;
                    }
                }
            }
            if (Tour.prototype.isPrototypeOf(map[numLigne][numColonne])) {
                for (var lt = Math.max(0, numLigne - map[numLigne][numColonne].portee); lt <= Math.min(20, numLigne + map[numLigne][numColonne].portee); lt++) {
                    for (var nc = Math.max(0, numColonne - map[numLigne][numColonne].portee); nc <= Math.min(height, numColonne + map[numLigne][numColonne].portee); nc++) {
                        if(numLigne != lt || numColonne != nc){
                            if(Ennemie.prototype.isPrototypeOf(map[lt][nc])){
                                map[lt][nc].pv= Math.max(0, map[lt][nc].pv - map[numLigne][numColonne].atk);
                                if(map[lt][nc].pv === 0){
                                    map[lt][nc] = map[lt][nc].case;
                                }
                            }
                        }
                        
                    }
                }
                map[numLigne][numColonne].pv= Math.max(0,map[numLigne][numColonne].pv- 5);
                if (map[numLigne][numColonne].pv == 0){
                    map[numLigne][numColonne]="p";
                }
            }
        }
    }
}
function resetEnemie(map) {
    for (var numLigne = 0; numLigne < Math.floor(height / 2); numLigne++) {
        for (var numColonne = 0; numColonne < height; numColonne++) {
            if (Ennemie.prototype.isPrototypeOf(map[numLigne][numColonne])) {
                map[numLigne][numColonne].aJoue = false;
            }
        }
    }
}