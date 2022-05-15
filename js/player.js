class player {
     cursor;
    constructor(vie, degat) {
        this.vie = vie;
        this.degat = degat;
       
    }
     attack(player){
         player.setvie(Math.floor(player.getvie()-this.degat));
         console.log(player.vie)

    }
    setvie(vie){
        this.vie=vie;
    }
    getvie(){
        return this.vie;
    }
    getdegat(){
        return this.degat;
    }

    
    
}

/*Test*/
// var pr=new player(100,50)
// var pr2=new player(100,80)

// pr.attack(pr2)
