var balloon,balloonImage1,balloonImage2;
var hypnoticBall;
var database;
var height;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  

  createCanvas(1290,610);
  database=firebase.database();
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonPos= database.ref('ball/position')
  balloonPos.on("value",readHeight, showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writeHeight(-10,0);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writeHeight(+10,0);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writeHeight(0,-10);
    balloon.scale=balloon.scale-0.01;
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writeHeight(0,+10);
    balloon.scale=balloon.scale+0.01;
    //write code to move air balloon in down direction
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!**",40,40);
}


function readHeight(data){
  height=data.val();
  balloon.x=height.x;
 balloon.y=height.y;
  }
  
  function showError(){
  console.log("ERROR in writing to the database")
  }
  
  function writeHeight(x,y){
  database.ref('ball/position').set({
      'x':height.x+x,
      'y':height.y+y
  })
  }
