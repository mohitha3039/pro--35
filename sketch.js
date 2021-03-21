//Create variables here
var dog, happydog;
var database;
var foodS;
var foodStock;

function preload()
{
  DogImg1 = loadImage("images/dogImg.png");
  DogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(800, 550);

  database = firebase.database();
  
  Dog = createSprite(475,250,50,50);
  Dog.addImage(DogImg1);
  Dog.scale = 0.2;
  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

}


function draw() {
  background("purple");
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    Dog.addImage(DogImg2)
  }

  drawSprites();
  fill("Fuchsia");
  noStroke();
  textSize(30);
  text("Food Remaining: " + foodS,50,265);
  //add styles here

  
  textSize(40);
  text("Press up arrow to feed the Dog",100,405);

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  } else {
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}