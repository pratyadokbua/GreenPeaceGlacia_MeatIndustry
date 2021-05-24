var score = 0;
var current = 0;
var uhp = 3;
var walkck = [0, 0];
var myGamePiece;
var veggcount = 0;
var meatcount = 0;
var meat = [], veggie = [], tiger = [], virus = [];

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
  virus[0] = new component(50, 50, "New_Virus_clone.gif", 0, 0, "enemy");
  virus[1] = new component(50, 50, "New_Virus_clone_2.gif", 450, 0, "enemy");
  for (let i = 0; i < 5; i++){
    meat[i] = new component(30, 30, "Meat.gif", 0, 0, "food");
  }
  for (let i = 0; i < 3; i++){
    veggie[i] = new component(30, 30, "MiniTree.gif", 0, 0, "food");
  }
}

var myGameArea = { //เขียนหน้าต่างเกม
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
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
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


function updateGameArea(){
  var mytop = myGamePiece.y + 12;
  var mybottom = myGamePiece.y + (myGamePiece.height);
  var myleft = myGamePiece.x;
  var myright = myGamePiece.x + (myGamePiece.width);
  var virustop = [virus[0].y, virus[1].y]
  var virusbottom = [virus[0].y + (virus[0].height), virus[1].y + (virus[1].height)]
  var virusleft = [virus[0].x, virus[1].x]
  var virusright = [virus[0].x + virus[0].width, virus[1].x + virus[1].width]
  

myGameArea.clear()
myGamePiece.speedX = 0;
myGamePiece.speedY = 0;
virus[0].speedX = 0;
virus[0].speedY = 0;
virus[1].speedX = 0;
virus[1].speedY = 0;

  if(mytop > 0 && mybottom < 701 && myleft > 0 && myright < 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mytop == 0 && myleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mytop == 0 && myright == 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mybottom == 701 && myright == 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 0; }
  }
  else if(mybottom == 701 && myleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 0; }
  }
  else if(mytop == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = 0; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(myleft == 0){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(myright == 500){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 0; }
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 3; }
  }
  else if(mybottom == 701){
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -3; }//l
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 3; }//r
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -3; }//u
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 0; }//d
    }
myGamePiece.newPos();    
myGamePiece.update();  
for (let i = 0; i < 2; i++){
  if(virustop[i] > 0 && virusbottom[i] < 701 && virusleft[i] > 0 && virusright[i] < 500){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 3; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = -3; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 3; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = -3; }
    }
    else if(virustop[i] == 0 && virusleft[i] == 0){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 3; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = 0; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 3; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = 0; }
    }
    else if(virustop[i] == 0 && virusright[i] == 500){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 0; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = -3; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 3; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = 0; }
    }
    else if(virusbottom[i] == 701 && virusright[i] == 500){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 0; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = -3; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 0; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = -3; }
    }
    else if(virusbottom[i] == 701 && virusleft[i] == 0){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 3; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = 0; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 0; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = -3; }
    }
    else if(virustop[i] == 0){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 3; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = -3; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 3; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = 0; }
    }
    else if(virusleft[i] == 0){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 3; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = 0; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 3; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = -3; }
    }
    else if(virusright[i] == 500){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 0; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = -3; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 3; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = -3; }
    }
    else if(virusbottom[i] == 701){
      if (myGameArea.key && myGameArea.key == 37) {virus[i].speedX = 3; }
      if (myGameArea.key && myGameArea.key == 39) {virus[i].speedX = -3; }
      if (myGameArea.key && myGameArea.key == 38) {virus[i].speedY = 0; }
      if (myGameArea.key && myGameArea.key == 40) {virus[i].speedY = -3; }
      }
  virus[i].newPos();    
  virus[i].update();
  }

    for (let i = 0; i < 2; i++){
        tiger[i].newPos();
        tiger[i].update();
        if(tiger[i].x+tiger[i].width >= 500){
            walkck[i] = 1;
        }
        else if(tiger[i].x <= 0){
            walkck[i] = 0;
        }
        if (mybottom >= tiger[i].y + 10 && myright >= tiger[i].x + 10 && mytop <= (tiger[i].y+tiger[i].height - 10) && myleft <= tiger[i].x + tiger[i].width - 10){
            myGamePiece.x = 225;
            myGamePiece.y = 651;
            document.getElementById("hp").innerHTML = "Hp:"+"💗".repeat(uhp-=1); 
        }
        if (mybottom >= virustop[0] + 10 && myright >= virusleft[0] + 10 && mytop <= (virusbottom[0] - 10) && myleft <= virusright[0] - 10){
            virus[0].x = 0;
            virus[0].y = 0;
            score = 0;
        }
        if (mybottom >= virustop[1] + 10 && myright >= virusleft[1] + 10 && mytop <= (virusbottom[1] - 10) && myleft <= virusright[1] - 10){
          virus[1].x = 0;
          virus[1].y = 651;
          score = 0;
      }
    }
    if (walkck[0] == 0){
        tiger[0].x += 6;
    }
    else{
        tiger[0].x -= 4;
    }
    if (walkck[1] == 0){
        tiger[1].x += 5;
    }
    else{
        tiger[1].x -= 6;
    }

  for (let i = 0 ; i < 5; i++){
    meat[i].update();
    if ((mybottom >= meat[i].y && myright >= meat[i].x && mytop <= (meat[i].y+meat[i].height) && myleft <= meat[i].x + meat[i].width) || 
      (mytop <= (meat[i].y + meat[i].height) && myright >= meat[i].x && mybottom >= meat[i].y && myleft <= meat[i].x + meat[i].width)){
        score += 5;
        document.getElementById("meat_count").innerHTML =": "+(meatcount+=1);
        meat[i].newPosf();
      }
    }

    for (let i = 0 ; i < 3; i++){
        veggie[i].update();
        if ((mybottom >= veggie[i].y && myright >= veggie[i].x && mytop <= (veggie[i].y+veggie[i].height) && myleft <= veggie[i].x + veggie[i].width) || 
          (mytop <= (veggie[i].y + veggie[i].height) && myright >= veggie[i].x && mybottom >= veggie[i].y && myleft <= veggie[i].x + veggie[i].width)){
            score += 2;
            document.getElementById("vegg_count").innerHTML = ": "+(veggcount += 1);
            veggie[i].newPosf();
          }
        }
        if (current < score){
            document.getElementById("myprog").style.width = (current += 1) + "%"
        }
        else if (current > score){
            document.getElementById("myprog").style.width = (current -= 1) + "%"
        }

        if (current >= 100){
          myGameArea.clear();
          myGameArea.reset();
          if (veggcount > meatcount){
            document.getElementById("goodend-page").style.display = "inline";
            document.getElementById("goodtext").style.color = "hsl(145, 67%, 21%)";
          }
          else{
            document.body.style.backgroundImage = "url('red1.png')";
            document.getElementById("badend-page").style.display = "inline";
            document.getElementById("badend-page").style.backgroundImage = "linear-gradient(rgba(233, 183, 183, 0.5),rgba(216, 160, 115, 0.5))";
            document.getElementById("badtext").style.color = "white";
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