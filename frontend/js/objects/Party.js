class Party{
    constructor(code , creator_id , player_ids , max_players , player){
        this.code = code;
        this.creator_id = creator_id;
        this.player_ids = player_ids;
        this.max_players = max_players;
        this.player = player;
    }

    createParty(){
        socket.emit('create-party' , this.code , this);
    }

    deleteParty(){
        socket.emit("delete-party" , this.code);

        socket.on("party-deleted" , (code) => {
            if(this.code === code)
                this.playerDisconnect();
        });
    }

    playerLeave(id){
        for(const player_id in this.player_ids)
            if(id === this.player_ids[player_id])
                this.player_ids = this.player_ids.slice(player_id , 1);
        
        socket.emit("update-party" , this.code , this);

        this.updateParty();
    }

    playerJoin(id){
        if(this.player_ids.length >= this.max_players)return;

        this.player_ids.push(id);

        socket.emit("update-party" , this.code , this);
        this.updateParty();
    }

    playerDisconnect(){
        this.playerLeave(player.id);

        //Message For Disconnection
    }

    updateParty(){
        socket.on("party-updated" , (code , party) => {
            if(this.code === code)
                this.player_ids = party.player_ids;
        });
    }

    displayParty(){
        document.getElementById("players-number-label").innerHTML = `Players: ${this.player_ids.length } / ${this.max_players}`;
    }

    
}