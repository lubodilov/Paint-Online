class Storage{
    constructor(){
        this.player_conf = undefined;
        this.party_conf = undefined;
    }

    setupStorage(){
        this.player_conf = JSON.parse(sessionStorage.getItem('player_conf'));
        this.party_conf = JSON.parse(sessionStorage.getItem('party_conf'));
    }

    listenForChange(){
        setInterval(() => {
            this.changeAll();
        } , 5000)   
    }

    changeAll(){
        this.changePlayerData();
        this.changePartyData();
    }

    changePlayerData(){
        sessionStorage.setItem('player_conf', JSON.stringify(this.player_conf));
    }

    changePartyData(){
        if(!this.party_conf){
            if(sessionStorage.party_conf)
                sessionStorage.removeItem('party_conf');
        }else{
            sessionStorage.setItem('party_conf', JSON.stringify(this.party_conf));
        }
    }

    savePlayerData(player){
        const playerConf = {
            id: player.id,
            name: player.name,
            image: player.image
        };
        
        this.player_conf = playerConf;
        
        sessionStorage.setItem('player_conf', JSON.stringify(playerConf));
    }

    getPlayerData(){
        return JSON.parse(sessionStorage.getItem('player_conf'));
    }

    savePartyData(party){
        const partyConf = {
            code: party.code ,
            creator_id: party.creator_id ,
            creator_name: party.creator_name ,
            player_ids: party.player_ids ,
            player_names: party.player_names ,
            max_players: party.max_players
        };
        
        this.party_conf = partyConf;
        
        sessionStorage.setItem('party_conf', JSON.stringify(partyConf));
    }

    removePartyData(){
        this.party_conf = undefined;

        if(sessionStorage.party_conf)
            sessionStorage.removeItem('party_conf');
    }

    getPartyData(){
        return JSON.parse(sessionStorage.getItem('party_conf'));
    }
}

let storage = new Storage();