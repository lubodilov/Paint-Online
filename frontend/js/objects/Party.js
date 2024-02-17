class Party{
    constructor(code , creator_id , creator_name , player_ids , player_names, max_players , local_player){
        this.code = code;
        this.creator_id = creator_id;
        this.creator_name = creator_name;
        this.player_ids = player_ids;
        this.player_names = player_names;
        this.max_players = max_players;
        this.local_player = local_player;
    }

    getData(){
        const obj = {
            code: this.code,
            creator_id: this.creator_id,
            creator_name: this.creator_name,
            player_ids: this.player_ids,
            player_names: this.player_names,
            max_players: this.max_players
        }

        return obj;
    }

    listenSockets(){
        socket.on("party-updated" , (party) => {
            storage.savePartyData(party);
            player.party?.partyUpdated(party);
        });

        socket.on("game-started" , () => {
            if(this.max_players == 1)
                location.pathname = `/solo/${player.party.code}`;
            else
                location.pathname = `/party/${player.party.code}`;
        })
    }

    createParty(){
        document.getElementById("start-game").removeAttribute("disabled");
        storage.savePartyData(this.getData());
        socket.emit('create-party' , this.getData());
        socket.emit("join-party" , this.code);
    }

    deleteParty(){
        storage.removePartyData();
        socket.emit("delete-party" , this.code);
        socket.emit("leave-party" , this.code);
    }

    changeCreator(){
        if(this.player_ids.length === 0)return;

        this.creator_id = this.player_ids[0];
        this.creator_name = this.player_names[0];
    }

    playerLeave(){
        for(const player_id in this.player_ids)
            if(this.local_player.id === this.player_ids[player_id]){
                this.player_ids.splice(player_id , 1);
                this.player_names.splice(player_id , 1);
                break;
            }

        if(this.local_player.id === this.creator_id)
            this.changeCreator();  
        
        if(this.player_ids.length === 0)
            this.deleteParty();
        else
            this.updateParty();
    }

    playerJoin(leaveFn){
        if(this.player_ids.length == this.max_players){
            leaveFn();
            //TODO Function that display error popup for too many people
            console.log("party full!");
            return;
        }

        socket.emit("join-party" , this.code);

        this.player_ids.push(this.local_player.id);
        this.player_names.push(this.local_player.name);

        this.updateParty();
    }

    playerDisconnect(){
        //TODO Message For Disconnection
    }

    updateParty(){
        socket.emit("update-party" , this.code , this.getData());
    }

    partyUpdated(party){
        this.creator_id = party.creator_id;
        this.creator_name = party.creator_name;
        this.player_ids = party.player_ids;
        this.player_names = party.player_names;
        this.max_players = party.max_players;
        
        this.displayParty();
    }

    displayParty(){
        document.getElementById("party-code").innerHTML = `Code: ${this.code}`;
        document.getElementById("players-joined").innerHTML = `Players: ${this.player_ids.length } / ${this.max_players}`;
        document.getElementById("creator").innerHTML = `Creator: ${this.creator_name} ${(this.creator_id === this.local_player.id) ? "(You)" : ""}`;

        const party_players_el = document.getElementById("players-joined-ids");
        const player_els = document.getElementsByClassName("player-party-info");

        while(player_els.length > 0)
            player_els[0].remove();

        for(let i = 0; i < this.player_names.length;i++){
            const div = document.createElement("div");
            div.classList = "player-party-info";

            const name_label = document.createElement("label");

            name_label.innerHTML = `${this.player_names[i]} ${(this.player_ids[i] === this.local_player.id) ? "(You)" : ""}`;

            party_players_el.append(div)
            div.append(name_label);

            if(this.local_player.id === this.creator_id && this.player_ids.length == this.max_players)
                document.getElementById("start-game").removeAttribute("disabled");
            else
                document.getElementById("start-game").setAttribute("disabled" , "");

        }
    }

    startGame(){
        storage.changePlayerData();
        socket.emit("start-game" , this.code);
    }
}