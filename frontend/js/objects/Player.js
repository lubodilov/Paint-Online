class Player{
    constructor(id , name , image){
        this.id = id;
        this.name = name;
        this.image = image;
        this.party = undefined;
        this.game = undefined;
    }

    setupPlayer(){
        let img_el = document.getElementById("player-img");
        let name_el = document.getElementById("player-name");

        img_el.src = this.image;
        name_el.innerHTML = `${this.name}`;
    }

    createMatch(max_players){
        if(this.party)return;
        if(max_players == 1)
            this.party = new Party(this.id , this.id , this.name , [this.id] , [this.name] , max_players , this);
        else
            this.party = new Party(generateCode(6), this.id , this.name , [this.id] , [this.name] , max_players , this);
        
        this.party.listenSockets();
        this.party.createParty();
        this.party.displayParty();
    }

    joinMatch(code , leaveFn){
        if(this.party)return;

        socket.emit("search-party" , code);

        socket.on("party-searched" , (party) => {
                if(!party){
                    //TODO Function that shows error party not found
                    leaveFn();
                    console.log("Party not found!")
                    return;
                }
             
                this.party = new Party( party.code , 
                                        party.creator_id ,
                                        party.creator_name ,
                                        party.player_ids ,
                                        party.player_names ,
                                        party.max_players ,
                                        this
                                        );

                this.party.listenSockets();    
                this.party.playerJoin(this.id , this.name , leaveFn);
            });
        }

    leaveMatch(){
        if(!this.party)return;
        this.party.playerLeave(this.id);
        this.party = undefined;
    }
}