class Game {
  constructor() {
    this.resettitle=createElement("h2") 
    this.resetbutton=createButton("")

    this.leaderBoardTitle=createElement("h2")
    this.leader1=createElement("h2")
    this.leader2=createElement("h2")
  }

  getState() {
    var gameStateref=database.ref("gameState")
    gameStateref.on("value",function(data){
      gameState=data.val()
    })
  }
  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount()
    car1=createSprite(width/2-50,height-100)
    car1.addImage("car1",car1Img)  
    car1.scale=0.07
    car2=createSprite(width/2+100,height-100)
    car2.addImage("car2",car2Img)  
    car2.scale=0.07
    cars=[car1,car2]
  }

  update(state) {
database.ref("/").update({
  gameState:state
})
  }

  handleElements() {
    form.hide()
    form.titleImg.position(40,50)
    form.titleImg.class("gameTitleAfterEffect")
    this.resettitle.html("Reset Game")
    this.resettitle.class("resettext")
    this.resettitle.position(width/2+200,40)
    this.resetbutton.class("resetbutton")
    this.resetbutton.position(width/2+230,100)

    this.leaderBoardTitle.html("Leader Board")
    this.leaderBoardTitle.class("resettext")
    this.leaderBoardTitle.position(width/3-60,40)

    this.leader1.class("leaderstext")
    this.leader1.position(width/3-50,80)

    this.leader2.class("leaderstext")
    this.leader2.position(width/3-50,130)
  }

  handlePlayerControls() {
    if(keyIsDown(UP_ARROW)){
      player.positionY +=10
      player.update()
    } 
  }
  play() {
    this.handleElements()
    Player.getplayerinfo()
    
    if(allplayers!==undefined)
{
  image(track,0,-height*5,width,height*6)
  this.showLeaderBoard()
  var index=0
  for(var plr in allplayers){
    index=index+1
    var x=allplayers[plr].positionX
    var y=height-allplayers[plr].positionY
    cars [index-1].position.x=x
    cars [index-1].position.y=y
    if(index===player.index) {
      stroke(10)
      fill("red")
      ellipse(x,y,60,60)
    }
  }
  

  this.handlePlayerControls() 

  
  drawSprites();
} 
  

  }

  showLeaderBoard() {
    var leader1,leader2
    var players=Object.values(allplayers)
    if((players[0].rank===0 && players[1].rank===0)|| players[0].rank===1) {
      leader1=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
      leader2=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score

    }
    if(players[1].rank===1) {
      leader1=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
      leader2=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score

    }
    this.leader1.html(leader1)
    this.leader2.html(leader2)
  }
}

