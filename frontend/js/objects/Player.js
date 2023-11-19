let socket = io();

class Player{
    constructor(id , name , image){
        this.id = id;
        this.name = name;
        this.image = image;
        this.party = undefined;
    }

    setupPlayer(){
        let img_el = document.getElementById("player-img");
        let name_el = document.getElementById("player-name");

        img_el.src = this.image;
        name_el.innerHTML = `${this.name}`;
    }

    createMatch(){

    }

    joinMatch(code){

    }

    leaveMatch(){

    }
}