class Game{
    constructor(){
        this.number1 = 0,
        this.number2 = 0,
        this.counter1 = createElement('h2');
        this.counter2 = createElement('h2');
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();
                this.counter1.html("Player1: "+this.number1)
                this.counter2.html("Player2: "+this.number2)
                this.counter1.position(200,200)
                this.counter2.position(200,250)
                this.counter1.style('color','white')
                this.counter2.style('color','white')

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                         fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);

                         
                     }
                    
                     
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 80 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                 }
                 
                  if (player.index !== null) {
                      if(player1.isTouching(fruitGroup)){
                          fruitGroup.destroyEach()
                          this.number1 = this.number1 + 1
                          database.ref("Fruit1").update({
                            Fruit1 : this.number1
                        })
                
                    }
                      }
                      if(player2.isTouching(fruitGroup)){
                        this.number2 = this.number2 + 1
                        this.score2 = this.score + 1
                        fruitGroup.destroyEach()
                        database.ref("Fruit2").update({
                          Fruit2 : this.number2
                      })
                      }
                

         
         
        
         

    }

    end(){
       console.log("Game Ended");
    }
}