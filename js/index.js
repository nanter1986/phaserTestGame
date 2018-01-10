//import { Phaser } from "./phaser.js";

var game = new Phaser.Game(800,600,Phaser.AUTO,'',
{ preload: preload, create: create, update: update ,render: render});

function preload(){
  game.load.image("man","assets/man.png");
  game.load.image("sky","assets/sky.jpg");
  game.load.image("coin","assets/coin.png");
  game.load.image("house","assets/house.png");
}

function create(){

  game.world.setBounds(0,0,2046,2046);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  cursors =game.input.keyboard.createCursorKeys();

  game.add.sprite(0,0,"sky");
  s=game.add.sprite(0,0,"man");
  s.scale.setTo(0.1,0.1);
  game.physics.arcade.enable(s);
  s.body.bounce.y=0.2;
  s.body.gravity.y=300;
  s.body.collideWorldBounds=true;

  houses=game.add.group();
  houses.enableBody=true;
  var house=houses.create(game.world.width/2,game.world.height/2,"house");
  house.body.immovable=true;
  house.scale.setTo(0.5,0.5);




  stars=game.add.group();
  stars.enableBody=true;
  for(var i=0;i<12;i++){
    var star =stars.create(i*70,0,'coin');
    star.body.gravity.y=12;
    star.body.bounce.y=0.7+Math.random()*0.2;
    star.scale.setTo(0.1,0.1);
    star.body.collideWorldBounds=true;
  }

  score=0;
  scoreText=game.add.text(16,16,'score:0',
  {fontsize:'32px',fill:'#000'});

  game.camera.follow(s);

}

function update(){
  var hitHouse=game.physics.arcade.collide(s,houses);


  s.body.velocity.x=0;

  if(cursors.left.isDown){
    console.log("forward");
    s.body.velocity.x=-150;

  }else if(cursors.right.isDown){
    console.log("back");
    s.body.velocity.x=150;

  }else{

  }


  if(cursors.up.isDown){
    console.log("jump");
    s.body.velocity.y=-350;
  }

  game.physics.arcade.overlap(s,stars,collectStar,null,this);
}

function render(){
  game.debug.cameraInfo(game.camera,32,32);
  game.debug.spriteCoords(s,32,500);
}

function collectStar(s,star){
  star.kill();

  score+=10;
  scoreText.text='score: '+score;
}
