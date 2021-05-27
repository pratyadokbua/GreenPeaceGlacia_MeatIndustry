var score = 0;
var current = 0;
var uhp = 3;
var veggcount = 0;
var meatcount = 0;
var meat = [], veggie = [], tiger = [], virus = [];
var Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

function changepic1(){
  document.getElementById("gpic1").src = "goodend2.png";
  document.getElementById("goodbutt").style.display = "none";
  document.getElementById("goodwbutt").style.display = "block";
}
function changepic2(){
  document.getElementById("bpic1").src = "badend2.png";
  document.getElementById("bbbutt").style.display = "none";
  document.getElementById("badbutt").style.display = "block";
}

function howToPlay() {
  document.getElementById("dsplay").style.display = "none";
  document.getElementById("dshowto").style.display = "inline";
  document.getElementById("dshowto2").style.display = "none";

}
function howToPlay2() {
  document.getElementById("dshowto2").style.display = "inline";
  document.getElementById("dshowto").style.display = "none";
}
function goMain() {
  document.getElementById("dsplay").style.display = "inline";
  document.getElementById("dshowto").style.display = "none";
  document.getElementById("dshowto2").style.display = "none";
  document.getElementById("killed").style.display = "none";
  document.getElementById("canvas").style.display = "none"
  document.getElementById("stats").style.display = "none"
  myGameArea.reset();
}
function startGame() {
  document.getElementById("dsplay").style.display = "none";
  document.getElementById("dshowto").style.display = "none";
  document.getElementById("dshowto2").style.display = "none";
  document.getElementById("killed").style.display = "none";
  document.getElementById("canvas").style.display = "initial";
  document.getElementById("stats").style.display = "block";
  myGameArea.start();
  myGamePiece = new component(50, 50, "hero.gif",225,651, "image");
  tiger[0] = new component(60, 60, "Tiger.gif", 0, 400, "enemy");
  tiger[1] = new component(60, 60, "Tiger.gif", 0, 200, "enemy");
  virus[0] = new component(50, 50, "New_Virus_clone.gif", 75, 50, "enemy");
  virus[1] = new component(50, 50, "New_Virus_clone_2.gif", 0, 250, "enemy");
  for (let i = 0; i < 5; i++){
    meat[i] = new component(30, 30, "Meat.gif", 0, 0, "food");
  }
  for (let i = 0; i < 3; i++){
    veggie[i] = new component(30, 30, "MiniTree.gif", 0, 0, "food");
  }
}

var myGameArea = { //canvas setting + keyboard input
  canvas : document.getElementById("canvas"),
  start : function() {
      score = 0;
      uhp = 3;
      veggcount = 0;
      meatcount = 0;
      document.getElementById("meat_count").innerHTML =": 0";
      document.getElementById("vegg_count").innerHTML = ": 0";
      document.getElementById("hp").innerHTML = "Hp:"+"💗".repeat(uhp);
      this.canvas.width = 500;
      this.canvas.height = 701;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('keydown', function (e) {
          if (e.keyCode == 37) Keys.left = true
          if (e.keyCode == 39) Keys.right = true
          if (e.keyCode == 38) Keys.up = true
          if (e.keyCode == 40) Keys.down = true
      })
      window.addEventListener('keyup', function (e) {
          if (e.keyCode == 37) Keys.left = false
          if (e.keyCode == 39) Keys.right = false
          if (e.keyCode == 38) Keys.up = false
          if (e.keyCode == 40) Keys.down = false
      })
  },
  reset : function(){
      clearInterval(this.interval);
  },
  clear : function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}


function component(width, height, color, x, y, type) { //สถานะplayer
    this.type = type;
    if (type == "image" || type == "food" || type == "enemy") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    if (type == "food") {
      this.x = Math.floor(Math.random() * 450)
      this.y = Math.floor(Math.random() * 650)
    }
    else{
      this.x = x;
      this.y = y; 
    }
    this.speedX = 0;
    this.speedY = 0;    
    this.update = function() {
      ctx = myGameArea.context;
      if (type == "image" || type == "food" || type == "enemy") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } 
      else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.newPosf = function() {
      this.x = Math.floor(Math.random() * 450);
      this.y = Math.floor(Math.random() * 650);
    }
}


function updateGameArea(){ //makes everything living

  var mytop = myGamePiece.y + 12;
  var mybottom = myGamePiece.y + (myGamePiece.height);
  var myleft = myGamePiece.x;
  var myright = myGamePiece.x + (myGamePiece.width);
  var virustop = [virus[0].y, virus[1].y]
  var virusbottom = [virus[0].y + (virus[0].height), virus[1].y + (virus[1].height)]
  var virusleft = [virus[0].x, virus[1].x]
  var virusright = [virus[0].x + virus[0].width, virus[1].x + virus[1].width]

  myGameArea.clear()

  if(mytop > 0 && mybottom < 701 && myleft > 0 && myright < 500){
      if (Keys.left) {myGamePiece.x -= 3; }
      if (Keys.right) {myGamePiece.x += 3; }
      if (Keys.up) {myGamePiece.y -= 3; }
      if (Keys.down) {myGamePiece.y += 3; }
  }
  else if(mytop == 0 && myleft == 0){
      if (Keys.left) {myGamePiece.x += 0; }
      if (Keys.right) {myGamePiece.x += 3; }
      if (Keys.up) {myGamePiece.y += 0; }
      if (Keys.down) {myGamePiece.y += 3; }
  }
  else if(mytop == 0 && myright == 500){
      if (Keys.left) {myGamePiece.x -= 3; }
      if (Keys.right) {myGamePiece.x += 0; }
      if (Keys.up) {myGamePiece.y += 0; }
      if (Keys.down) {myGamePiece.y += 3; }
  }
  else if(mybottom == 701 && myright == 500){
      if (Keys.left) {myGamePiece.x -= 3; }
      if (Keys.right) {myGamePiece.x += 0; }
      if (Keys.up) {myGamePiece.y -= 3; }
      if (Keys.down) {myGamePiece.y += 0; }
  }
  else if(mybottom == 701 && myleft == 0){
      if (Keys.left) {myGamePiece.x += 0; }
      if (Keys.right) {myGamePiece.x += 3; }
      if (Keys.up) {myGamePiece.y -= 3; }
      if (Keys.down) {myGamePiece.y += 0; }
  }
  else if(mytop == 0){
      if (Keys.left) {myGamePiece.x -= 3; }
      if (Keys.right) {myGamePiece.x += 3; }
      if (Keys.up) {myGamePiece.y += 0; }
      if (Keys.down) {myGamePiece.y += 3; }
  }
  else if(myleft == 0){
      if (Keys.left) {myGamePiece.x += 0; }
      if (Keys.right) {myGamePiece.x += 3; }
      if (Keys.up) {myGamePiece.y -= 3; }
      if (Keys.down) {myGamePiece.y += 3; }
  }
  else if(myright == 500){
      if (Keys.left) {myGamePiece.x -= 3; }
      if (Keys.right) {myGamePiece.x += 0; }
      if (Keys.up) {myGamePiece.y -= 3; }
      if (Keys.down) {myGamePiece.y += 3; }
  }
  else if(mybottom == 701){
      if (Keys.left) {myGamePiece.x -= 3; }//left
      if (Keys.right) {myGamePiece.x += 3; }//right
      if (Keys.up) {myGamePiece.y -= 3; }//up
      if (Keys.down) {myGamePiece.y += 0; }//down
  }
  myGamePiece.newPos();    
  myGamePiece.update();

if (virus[0].x == 75 && virus[0].y == 50) {virus[0].speedX = 0; virus[0].speedY = 5}//first virus
    if (virus[0].x == 75 && virus[0].y == 600) {virus[0].speedX = 5; virus[0].speedY = 0}
    if (virus[0].x == 375 && virus[0].y == 600) {virus[0].speedX = 0; virus[0].speedY = -5}
    if (virus[0].x == 375 && virus[0].y == 50) {virus[0].speedX = -5; virus[0].speedY = 0}
    virus[0].newPos();
    virus[0].update();

    if (virus[1].x == 0 && virus[1].y == 250) {virus[1].speedX = 6; virus[1].speedY = 0}//second virus
    if (virus[1].x == 450 && virus[1].y == 250) {virus[1].speedX = 0; virus[1].speedY = 5}
    if (virus[1].x == 450 && virus[1].y == 360) {virus[1].speedX = -6; virus[1].speedY = 0}
    if (virus[1].x == 0 && virus[1].y == 360) {virus[1].speedX = 0; virus[1].speedY = -5}
    virus[1].newPos();
    virus[1].update();

  if (tiger[0].x == 0) {tiger[0].speedX = 6;}//first tiger
  if (tiger[0].x == 450) {tiger[0].speedX = -5}
  tiger[0].newPos();
  tiger[0].update();

  if (tiger[1].x == 0) {tiger[1].speedX = 5}//second tiger
  if (tiger[1].x == 450) {tiger[1].speedX = -6}
  tiger[1].newPos();
  tiger[1].update();

  //when hit tiger
  if ((mybottom >= tiger[0].y + 10 && myright >= tiger[0].x + 10 && mytop <= (tiger[0].y+tiger[0].height - 10) && myleft <= tiger[0].x + tiger[0].width - 10) ||
      (mybottom >= tiger[1].y + 10 && myright >= tiger[1].x + 10 && mytop <= (tiger[1].y+tiger[1].height - 10) && myleft <= tiger[1].x + tiger[1].width - 10)){
      myGamePiece.x = 225;
      myGamePiece.y = 651;
      document.getElementById("hp").innerHTML = "Hp:"+"💗".repeat(uhp-=1); 
  }

  //when hit virus1
  if (mybottom >= virustop[0] + 10 && myright >= virusleft[0] + 10 && mytop <= (virusbottom[0] - 10) && myleft <= virusright[0] - 10){
      myGamePiece.x = 225;
      myGamePiece.y = 651;
      virus[0].x = 75;
      virus[0].y = 50;
      score = 0;
  }
  
  //when hit virus2
  if (mybottom >= virustop[1] + 10 && myright >= virusleft[1] + 10 && mytop <= (virusbottom[1] - 10) && myleft <= virusright[1] - 10){
      myGamePiece.x = 225;
      myGamePiece.y = 651;
      virus[1].x = 0;
      virus[1].y = 250;
      score = 0;
  }

  //when hit meat
  for (let i = 0 ; i < 5; i++){
      meat[i].update();
      if ((mybottom >= meat[i].y && myright >= meat[i].x && mytop <= (meat[i].y+meat[i].height) && myleft <= meat[i].x + meat[i].width) || 
          (mytop <= (meat[i].y + meat[i].height) && myright >= meat[i].x && mybottom >= meat[i].y && myleft <= meat[i].x + meat[i].width)){
          score += 3
          document.getElementById("meat_count").innerHTML =": "+(meatcount+=1);
          meat[i].newPosf();
      }
  }

  //when hit vegetable
  for (let i = 0 ; i < 3; i++){
      veggie[i].update();
      if ((mybottom >= veggie[i].y && myright >= veggie[i].x && mytop <= (veggie[i].y+veggie[i].height) && myleft <= veggie[i].x + veggie[i].width) || 
          (mytop <= (veggie[i].y + veggie[i].height) && myright >= veggie[i].x && mybottom >= veggie[i].y && myleft <= veggie[i].x + veggie[i].width)){
          score += 2
          document.getElementById("vegg_count").innerHTML = ": "+(veggcount += 1);
          veggie[i].newPosf();
      }
  }

  //increase or decrease progress bar 
  if (current < score){
      document.getElementById("myprog").style.width = (current += 1) + "%"
  }
  else if (current > score){
      document.getElementById("myprog").style.width = (current -= 1) + "%"
  }

  //task complete or out of hp
  if (current >= 100){
      myGameArea.clear();
      myGameArea.reset();
      if (veggcount > meatcount){
          document.getElementById("goodend-page").style.display = "inline";
      }
      else{
        document.body.style.backgroundImage = "url('red1.png')";
        document.getElementById("badend-page").style.display = "inline";
        document.getElementById("badend-page").style.backgroundImage = "linear-gradient(rgba(233, 183, 183, 0.5),rgba(216, 160, 115, 0.5))";
      }
      document.getElementById("stats").style.display = "none";
      document.getElementById("canvas").style.display = "none";
  }
  else if (uhp == 0){
      myGameArea.clear();
      myGameArea.reset();
      document.getElementById("killed").style.display = "inline"
      document.getElementById("stats").style.display = "none";
      document.getElementById("canvas").style.display = "none";
  }
}
