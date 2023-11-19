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
        if(party)return;
        const party_id = generateCode(6);
        this.party = new Party(party_id , this.id , [this.id]);
        socket.emit("party-created" , (this.party_id , this.party));
    }

    joinMatch(code){

    }

    leaveMatch(){

    }
}