//TODO Validation if a person is joining the route by typing it and the route not containing a real party

createColors();

const player_data = storage.getPlayerData();
const party_data = storage.getPartyData();
const canvas = document.getElementById("gameCanvas");

player = new Player(player_data.id , player_data.name , player_data.image);
player.party = new Party(party_data.code ,
                         party_data.creator_id, 
                         party_data.creator_name,
                         party_data.player_ids,
                         party_data.player_names, 
                         party_data.max_players,
                         player);
game = new Game(player , canvas);

// game.listenForSockets();
game.listenForEvents();
