var x = random(50,300);
var characterX = x;
var y = random(50,300);
var characterY = y;
var gameScore = 0; //initial score
frameRate(0.5); //fps
var m = millis();
var currentScene; //Scene
var startTime; //Time
var WordArray = ["House", "Mouse", "Clouds", "Earth","Heart"]; //words to draw
var currentWord = 0; //word assignment
var h = 35;
var drawHead = function(x,y,h){
    fill(255, 205, 140);
    ellipse(x+(h/100),y+(h/100),83*(h/100),100*(h/100)); //head
    fill(61, 255, 181);
    noStroke();
    arc(x-(h/100)*42,y+(h/100)*37,(h/100)*28,(h/100)*55,0,361); //left-chisel
    arc(x+(h/100)*42,y+(h/100)*37,(h/100)*28,(h/100)*55,0,361); //right-chisel
    fill(173, 131, 59);//hair
    quad(x-(h/100)*50,y+(h/100),x-(h/100)*37,y-(h/100)*32,x-(h/100)*13,y-(h/100)*50,x      -(h/100)*30,y-(h/100)*1); //left hair
    quad(x+(h/100)*49,y-(h/100)*2,x+(h/100)*34,y-(h/100)*32,x+(h/100)*13,y-(h/100)*41,x     +(h/100)*35,y-(h/100)*3); //right hair
    ellipse(x+(h/100),y-(h/100)*37,(h/100)*62,(h/100)*28); //top hair
    fill(115,23,23); //brown eyes
    ellipse(x-(h/100)*10,y+(h/100),(h/100)*8,(h/100)*6); //left eye
    ellipse(x+(h/100)*17,y+(h/100),(h/100)*8,(h/100)*6); //right eye
    stroke(0, 0, 0); //nose outline
    fill(255, 205, 140);//skin
    bezier(x+(h/100),y+(h/100),x+(h/100)*21,y+(h/100)*22,x-(h/100)*8,y+(h/100)*20,x-(h     /100)*4,y+(h/100)*15); //nose
    fill(217, 67, 77);//mouth
    arc(x+(h/100)*3,y+(h/100)*29,(h/100)*27,(h/100)*11,1,353); //mouth
    line(x-(h/100)*11,y+(h/100)*28,x+(h/100)*17,y+(h/100)*28);//top mouth
    fill(189, 189, 189);//hair
    arc(x+(h/100),y-(h/100)*40,(h/100)*64,(h/100)*29,-7,353); //top hair
    arc(x-(h/100)*10,y-(h/100)*40,(h/100)*64,(h/100)*27,102,356); //top hair
    arc(x+(h/100)*12,y-(h/100)*40,(h/100)*64,(h/100)*27,242,478); //top hair
};
var drawBody = function(x,y,h){
    fill(255, 205, 140);//skin
    ellipse(x-(h/100)*51,y+(h/100)*134,(h/100)*30,(h/100)*113);//left arm
    ellipse(x+(h/100)*55,y+(h/100)*134,(h/100)*30,(h/100)*113);//right arm
    rect(x-(h/100)*11,y+(h/100)*45,(h/100)*23,(h/100)*30,20);
    fill(0, 0, 0);//shirt
    rect(x-(h/100)*39,y+(h/100)*64,(h/100)*82,(h/100)*110,60);//shirt
    ellipse(x-(h/100)*51,y+(h/100)*113,(h/100)*30,(h/100)*82);//left arm
    ellipse(x+(h/100)*55,y+(h/100)*113,(h/100)*30,(h/100)*82); //right arm
    rect(x-(h/100)*51,y+(h/100)*65,(h/100)*104,(h/100)*43,20);//shoulders
    fill(240, 70, 70);//logo
    ellipse(x+(h/100)*2,y+(h/100)*112,(h/100)*36,(h/100)*33);//logo
    noStroke();
    fill(0, 225, 255);
    textSize((h/100)*20);
    text("D.S",x-(h/100)*16,y+(h/100)*103,(h/100)*25,(h/100)*25);
};
var drawBitmoji = function(x,y,h){
    drawHead(x,y,h);
    drawBody(x,y,h);
};

var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 100;
    this.height = config.height || 30;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
};

Button.prototype.draw = function() {
    fill(0, 234, 255);
    rect(this.x, this.y, this.width, this.height, 5);
    fill(0, 0, 0);
    textSize(19);
    textAlign(LEFT, TOP);
    text(this.label, this.x+10, this.y+this.height/4);
};

Button.prototype.isMouseInside = function() {
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
};

Button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
        this.onClick();
    }
};

var btn1 = new Button({
    x: 150,
    y:188,
    label:"   Start",
    onClick: function(){
        background(61, 255, 181);
        currentScene = 1;
        startTime = millis();
    }
}); //button function 


//scene 0
var drawScene0 = function(){
    currentScene = 0; //splash screen
    background(61, 255, 181);
    fill(20, 19, 19);
    textSize(28);
    text("Doodle Game", 105,159); //name of game
    textSize(19);
    text("by Danny S.",146,183); //credits
    textSize(15);
    text("Directions: Draw the word for points", 90,238); //directions
    drawBitmoji(196,293,h);
    btn1.draw();
};

//scene 1 
var drawScene1 = function(){ 
    fill(61, 255, 181);
    rect(-1, -1, 404,75); //show score and time without interfering with drawing
    textSize(20);
    fill(255, 255, 255);
    text((millis() - startTime)/1000,15,25);
    text("Score: "+ gameScore,159,25); //score display
    text("Word: ", 159,48); 
    text(WordArray[currentWord],214,48); //word display
    fill(0, 0, 0);
    noStroke();
};

// scene 2
var drawScene2 = function(){
    background(61,255,181);
    fill(0, 0, 0);
    textSize(25);
    text("Score:"+ gameScore,154,200);
    textSize(20);
    text("    Thanks for doodling!",97,154);
    drawBitmoji(56,166,h);
};

mouseClicked = function() {
    if (currentScene === 0) {
        btn1.handleMouseClick(); //button1 function
    }
    
    
};

draw = function() {
    if (currentScene === 1) {
        drawScene1();
        mouseDragged = function(){
    fill(0, 0, 0);
    ellipse(mouseX, mouseY, 10, 10); //drawing feature
};
    if ((millis() - startTime)/1000 >= 20 ){
        currentWord=1;
        gameScore=1; //first word 0-20sec
    }
    if ((millis() - startTime)/1000 >= 40){
        currentWord=2;
        gameScore=2; //second word 20-40sec
    }
    if ((millis() - startTime)/1000 >= 60){
        currentWord=3;
        gameScore=3; //third word 40-60sec
    }
    if ((millis() - startTime)/1000 >= 80){
        currentWord=4;
        gameScore=4; //4thword 80-100sec
    }
    if ((millis() - startTime)/1000 >= 100){
        drawScene2(); //Last scene after 100sec
    }
    }
};

drawScene0();
fill(0, 0, 0);
for (var i = 0; i < 8; i+=1) {
    var x = i * 50;
    ellipse(x + 20, 381, 45, 10);
} //top black decoration
for (var i = 0; i < 8; i+=1) {
    var x = i * 50;
    ellipse(x + 20, 19, 45, 10);
} //bottom black decoration
fill(255, 255, 255);
for (var i = 0; i < 8; i+=1) {
    var x = i * 50;
    ellipse(x + 20, 371, 45, 10);
} //top white decoration
for (var i = 0; i < 8; i+=1) {
    var x = i * 50;
    ellipse(x + 20, 30, 45, 10);
} //bottom white decoration 
