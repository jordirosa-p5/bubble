let mida, midaAnterior;
let grupPlataformes, parets;
let bubSprite, imgBub01, imgBubBoca;
let chanSprite, animChan;
let midaPerson = 0.004;
let bolaSprite, bolaAnim;

function preload() {
    imgBub01 = loadImage("img/bub01.png");
    imgBubBoca = loadImage("img/bub_boca02.png");
    
    animChan = loadAnimation("img/chan1.png", "img/chan4.png");
    
    let ssBola = loadSpriteSheet("img/bombollaFoc.png", 16, 16, 3);
    bolaAnim = loadAnimation(ssBola);
}

function setup() {
    //Creem el canvas quadrat de la mida que toqui
    mida = midaFinestra();
    createCanvas(mida, mida);
    
    grupPlataformes = new Group();
    parets = new Group();
    creaPlataformes();
    
    //Creem sprite jugador
    bubSprite = createSprite( width*0.1, height*0.1, 16, 16);
    bubSprite.addImage('quiet',imgBub01);
    bubSprite.addImage('boca', imgBubBoca);
    bubSprite.scale = width*midaPerson;
    bubSprite.friction = 0.02;
    
    //Creem sprite del Chan (el chungo)
    chanSprite = createSprite( random(width), random(height), 16, 16);
    let chAn = chanSprite.addAnimation('caminant', animChan);
    chAn.frameDelay = 8;
    chanSprite.scale = width*midaPerson;
    
    //Creem sprite de bola de foc
    setTimeout( creaBolaFoc, random(3000, 6000) );
    
    
}

function draw() {
    background(255);
    
    if ( mouseIsPressed ) {
        bubSprite.changeImage('boca');
        bubSprite.attractionPoint( 0.5, mouseX, mouseY ); 
    }else{
        bubSprite.changeImage('quiet');
    }
    
    bubSprite.collide(parets);
    bubSprite.collide(grupPlataformes);
    
    if (bolaSprite){
        bubSprite.overlap(bolaSprite, agafaBolaFoc);
    }
    
    drawSprites();
}

////////////////////////////////////////////////////////
function creaPlataformes() {

    grupPlataformes.removeSprites();
    parets.removeSprites();
    
    let altPlat = width / 32;

    //Paret d'avall de tot
    let avall = createSprite(width / 2, height - (altPlat / 2), width, altPlat);
    avall.shapeColor = color("#f7b1f5");
    grupPlataformes.add(avall);

    //Paret esquerra
    let esquerra = createSprite(altPlat / 2, height / 2, altPlat, height);
    esquerra.shapeColor = color("#f7b1f5");
    parets.add(esquerra);

    //Paret dreta
    let dreta = createSprite(width - (altPlat / 2), height / 2, altPlat, height);
    dreta.shapeColor = color("#f7b1f5");
    parets.add(dreta);

    //Paret d'adalt de tot
    let adalt = createSprite(width / 2, altPlat / 2, width, altPlat);
    adalt.shapeColor = color("#f7b1f5");
    parets.add(adalt);

    //plataforma a 2/3
    let dosTers = createSprite(width / 2, height * 0.75, width * 0.5, altPlat);
    dosTers.shapeColor = color("#f7b1f5");
    grupPlataformes.add(dosTers);

}


function creaBolaFoc() {
    bolaSprite = createSprite( random(width), random(height), 16, 16 );
    bolaSprite.addAnimation('normal', bolaAnim);
    bolaSprite.scale = width*midaPerson;
    
}

function agafaBolaFoc() {
    bolaSprite.remove();
    bubSprite.dispara = true;
}





function midaFinestra() {
    let midaFinal;
    if (window.innerWidth >= window.innerHeight) {
        midaFinal = window.innerHeight;
    } else {
        midaFinal = window.innerWidth;
    }
    return midaFinal;
}

function windowResized() {
    midaAnterior = mida;
    mida = midaFinestra();
    resizeCanvas(mida, mida);
    this.camera.position.x = width/2;
    this.camera.position.y = height/2;      
    creaPlataformes();
}


























