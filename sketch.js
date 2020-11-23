//Creating global scopes....
var dog,happyDog;
var database;
var foodS;
var foodStock;
var dog_img,happydog_img;
var background_img,milk_img;
var bottle;
var feedThePet,addFood;
var fedTime,lastFed;
var foodObj;
var Continue;

function preload()
{
  dog_img = loadImage("images/dogImg.png");
  happydog_img = loadImage("images/dogImg1.png");
  background_img = loadImage("images/Background 1.jpg");
  milk_img = loadImage("images/Milk.png") ;
}

function setup() {
  //Creating canvas....
  createCanvas(750, 500);
  //declaring the database....
  database = firebase.database();
  //creating the dog....
  dog = createSprite(650,400,10,10);
  dog.addImage(dog_img);
  dog.scale = 0.2;
  //Creating Milk Bottle....
  Milk1 = new Milk(20,200);
  Milk2 = new Milk(50,200);
  Milk3 = new Milk(80,200);
  Milk4 = new Milk(110,200);
  Milk5 = new Milk(140,200);
  Milk6 = new Milk(20,290);
  Milk7 = new Milk(50,290);
  Milk8 = new Milk(80,290);
  Milk9 = new Milk(110,290);
  Milk10 = new Milk(140,290);
  //adding button to feed the pet....
  feedThePet = createButton("Feed The Dog");
  feedThePet.position(850,70);
  feedThePet.mousePressed(feedDog);
  //creating add stocks Button....
  addFood = createButton("Add Food");
  addFood.position(750,70);
  addFood.mousePressed(addStock);
  
  


  

}


function draw() {  
    background(background_img);
    
    if(foodS>0){
      Milk1.display();
    }
    if(foodS>1){
      Milk2.display();
    }
    if(foodS>2){
      Milk3.display();
    }
    if(foodS>3){
      Milk4.display();
    }
    if(foodS>4){
      Milk5.display();
    }
    if(foodS>5){
      Milk6.display();
    }
    if(foodS>6){
      Milk7.display();
    }
    if(foodS>7){
      Milk8.display();
    }
    if(foodS>8){
      Milk9.display();
    }
    if(foodS>9){
      Milk10.display();
    }

    

     fedTime = database.ref('FEEDTIME')  ;
     fedTime.on("value",function(data){
     lastFed = data.val();
     })

     
      drawSprites();
      //Using Styles....
      
      fill(255,255,224);
      textSize(20);
      if(lastFed>=12){
        text("Last Feed : "+lastFed%12 + "PM",200,30);

      } else if(lastFed===0){
        text("Last Feed : 12 AM",200,30);

      } else{
        text("Last Feed : "+lastFed,200,30);
      }
      
      //text("PRESS UP ARROW TO FEED THE DOG",80,50);


      foodStock = database.ref('FOOD');
      foodStock.on("value",readStock);
      console.log(foodS);

}
function readStock(data){

  //reading the value from the dataBase....
  foodS = data.val();

}
function writeStock(x){

  if(x<=0){
    x = 0;
  } else {
    x = x-1;
  }
  database.ref('/').update({
  FOOD : x
  })

}
function addStock(){
  if(foodS<10){
  foodS++
  database.ref('/').update({
    FOOD : foodS
  })
  }
}


function feedDog(){

  dog.addImage(happydog_img);
  
  if(foodS<=0){
    foodS = 0;
  } else {
    foodS = foodS-1;
  }
     database.ref('/').update({
    FOOD : foodS,
    FEEDTIME : hour()
    
  })

}



function getFoodstocks(){
  foodStock = database.ref('FOOD');
  foodStock.on("value",(data)=>{
  foodstock = data.val();
  
  })
}



