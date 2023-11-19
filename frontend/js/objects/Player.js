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

    createMatch(max_players){
        if(this.party)return;

        this.party = new Party(generateCode(6) , this.id , [this.id] , max_players , this);
        this.party.createParty();
        this.party.displayParty();
    }

    joinMatch(code){

    }

    leaveMatch(){
        if(this.party.creator_id === this.id)
            this.party.deleteParty();
        else
            this.party.playerLeave(this.id);

        this.party = undefined;
    }
}