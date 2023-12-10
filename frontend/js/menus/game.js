//TODO Validation if a person is joining the route by typing it and the route not containing a real party
const player_data = storage.getPlayerData();
const party_data = storage.getPartyData();

storage.savePlayerData(player_data);
storage.savePartyData(party_data);
storage.listenForChange();

socket.emit("join-party" , party_data.code);

document.addEventListener("DOMContentLoaded", function () {
  // Get the dropdown button element
  var dropdownBtn = document.querySelector("#basic-tools");

  // Toggle the display of the dropdown content on click
  dropdownBtn.addEventListener("click", function () {
    this.classList.toggle("show");
    var dropdownContent = this.querySelector("div");
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
});

player = new Player(player_data.id , player_data.name , player_data.image);
player.party = new Party(party_data.code ,
                         party_data.creator_id, 
                         party_data.creator_name,
                         party_data.player_ids,
                         party_data.player_names, 
                         party_data.max_players,
                         player);
                         
canvas = new Canvas();

canvas.listenForSockets();
canvas.listenForEvents();

createColors();



function createColors(){
    const grid = document.getElementById("colors");
    for(let i = 0;i < 15;i++){
      const el = document.createElement("div");
      el.classList = "color";
      el.style.backgroundColor = `${colors[i]}`;
      el.onclick = () => { updateColor(i) }
      grid.append(el); 
    }
}

function updateColor(index){
    if(colors[index] == "transparent")return;
    
    if(color1.selected){
        color1.color = colors[index];
        color1.html_el.style.backgroundColor = colors[index];
    }

    if(color2.selected){
        color2.color = colors[index];
        color2.html_el.style.backgroundColor = colors[index];
    }
}


function selectColor(num){
    if(num === 1){
        color1.selected = !color1.selected;
        if(color1.selected){
            color1.html_el.style.borderImage = "linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)";
            color1.html_el.style.borderImageSlice = "1";
            if(color2.selected)
                selectColor(2);
        }else
            color1.html_el.style.borderImage = "none";
    }else if(num === 2){
        color2.selected = !color2.selected;
        if(color2.selected){
            color2.html_el.style.borderImage = "linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red)";
            color2.html_el.style.borderImageSlice = "1";
            if(color1.selected)
                selectColor(1);
        }else
            color2.html_el.style.borderImage = "none";
    }else
        console.error("Invalid Arguement");
}


function triggerTool(selected_tool){
    const tool_els = document.getElementsByClassName("tool");
    for(const tool_el of tool_els)
        tool_el.style.backgroundColor = "transparent";

    if(tool == selected_tool)tool = NONE;
    else tool = selected_tool;
    
    if(tool != NONE)
        document.getElementById(tool).style.backgroundColor = "skyblue";

    //TODO cursor to become pencil , bucket , color picker and etc...
}