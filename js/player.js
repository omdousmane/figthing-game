class player {
     cursor;
    constructor(health, attack1, attack2) {
        this.health = health;
        this.attack1 = attack1;
        this.attack2 = attack2;
    }
     attack(player){
         player.setHealth(player.getHealth()-this.attack1);
         console.log(player.health)

    }
    setHealth(health){
        this.health=health;
    }
    getHealth(){
        return this.health;
    }

    create(ethis){
       
    }

     update1(){

        

    }
    
}


var pr=new player(100,20,5)
var pr2=new player(100,20,5)

pr.attack(pr2)
