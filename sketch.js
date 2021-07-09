var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var box, box1, box2;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);

	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)

	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, packageBody);

	box = Bodies.rectangle(width/2,height-45,200,20, {isStatic:true});
	box1 = Bodies.rectangle(width/2 -100,height-130,20,200, {isStatic:true});
	box2 = Bodies.rectangle(width/2 +100,height-130,20,200, {isStatic:true});
	World.add(world, box);
	World.add(world, box1);
	World.add(world, box2);

	packageSprite=createSprite(width/2, 80, 10,10, packageBody);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2;
	packageSprite.visible = false

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

	Engine.run(engine);
                 
}

function draw() {
  rectMode(CENTER);
  background(0);

  fill(255,0,0)
  rect(width/2,height-45,200,20);
  rect(width/2 -100,height-130,20,200);
  rect(width/2 +100,height-130,20,200);

  packageSprite.x= packageBody.position.x 
  packageSprite.y= packageBody.position.y 


  drawSprites();
 
}

function keyPressed() {

  if (keyCode === LEFT_ARROW) {
	 helicopterSprite.x=helicopterSprite.x-20;
	 push();
	  translation={x:-20,y:0}
	  Matter.Body.translate(packageBody, translation) 
	  pop();
	}
	 else if (keyCode === RIGHT_ARROW) { 
	  helicopterSprite.x=helicopterSprite.x+20; 
	  translation={x:20,y:0} 
	  Matter.Body.translate(packageBody, translation) 
	} 
	else if (keyCode === DOWN_ARROW) {
		 Matter.Body.setStatic(packageBody,false); 
		 packageSprite.visible = true;
		
}
}


