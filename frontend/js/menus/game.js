//TODO Validation if a person is joining the route by typing it and the route not containing a real party
// const player_data = storage.getPlayerData();
// const party_data = storage.getPartyData();
const player_data = {
    id: "lkjhgfd" , 
    name: "kjhgvfbn" ,
    image: "jhgfhjkls"
}

const party_data = {
    code: "hgfcdvb" ,
    creator_id: "fnmgfrdd" ,
    creator_name: "ajhgvfcv" ,
    player_ids: ["123" , "234"] ,
    player_names: ["123" , "234"] ,
    max_players: 2
}

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
createColors();



function createColors(){
    const grid = document.getElementById("colors");
    for(let i = 0;i < 15;i++){
      const el = document.createElement("div");
      el.classList = "color";
      el.style.backgroundColor = `${game.colors[i]}`;
      el.onclick = () => { updateColor(i) }
      grid.append(el); 
    }
}

function updateColor(index){
    if(game.colors[index] == "transparent")return;
    
    if(game.color1.selected){
        game.color1.color = game.colors[index];
        game.color1.html_el.style.backgroundColor = game.colors[index];
    }

    if(game.color2.selected){
        game.color2.color = game.colors[index];
        game.color2.html_el.style.backgroundColor = game.colors[index];
    }
}


function selectColor(num){
    if(num === 1){
        game.color1.selected = !game.color1.selected;
        if(game.color1.selected){
            game.color1.html_el.style.borderImage = "linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)";
            game.color1.html_el.style.borderImageSlice = "1";
            if(game.color2.selected)
                selectColor(2);
        }else
            game.color1.html_el.style.borderImage = "none";
    }else if(num === 2){
        game.color2.selected = !game.color2.selected;
        if(game.color2.selected){
            game.color2.html_el.style.borderImage = "linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)";
            game.color2.html_el.style.borderImageSlice = "1";
            if(game.color1.selected)
                selectColor(1);
        }else
            game.color2.html_el.style.borderImage = "none";
    }else
        console.error("Invalid Arguement");
}


function triggerTool(tool){
    const buf = game.tools[tool];

    for(const key in game.instruments)
        game.instruments[key] = false;  

    for(const key in game.shapes)
        game.shapes[key] = false;

    for(const key in game.tools)
        game.tools[key] = false;

    const tool_els = document.getElementsByClassName("tool");
    for(const tool_el of tool_els)
        tool_el.style.backgroundColor = "transparent";

    game.tools[tool] = !buf;
    if(game.tools[tool])
        document.getElementById(tool).style.backgroundColor = "skyblue";

    //TODO cursor to become pencil , bucket , color picker and etc...
}