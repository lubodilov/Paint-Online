//TODO Validation if a person is joining the route by typing it and the route not containing a real party
const player_data = storage.getPlayerData();
const party_data = storage.getPartyData();

storage.savePlayerData(player_data);
storage.savePartyData(party_data);
storage.listenForChange();

socket.emit("join-party" , party_data.code);

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
createPaletteColors();
createSizes();


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

function createPaletteColors(){
    const grid = document.getElementById("palette-popup-middle");
    for(let i = 0;i < 15;i++){
      const el = document.createElement("div");
      el.classList = "palette-color";
      el.style.backgroundColor = `${colors[i]}`;
      el.onclick = () => { changePaletteColor(i) };
      grid.append(el); 
    }
}

function changePaletteColor(index){
    const palette_colors = document.getElementsByClassName("palette-color");
    for(const palette_color of palette_colors)
        palette_color.style.border = "1px solid white";

    if(selected_palette_color == index)
        selected_palette_color = undefined;
    else{
        selected_palette_color = index;
        palette_colors[selected_palette_color].style.border = "3px solid white";
    }
  
}

function selectPaletteColor(){
    if(!selected_palette_color)return;
    const palette_color_els = document.getElementsByClassName("palette-color");
    const color_els = document.getElementsByClassName("color");
    const input = document.getElementById("palette-color-input");
    colors[selected_palette_color] = input.value;
    palette_color_els[selected_palette_color].style.backgroundColor = `${input.value}`;
    color_els[selected_palette_color].style.backgroundColor = `${input.value}`;

}

function openPalettePopup(){
    const palette_popup_el = document.getElementById("palette-popup-wrapper");
    showEl(palette_popup_el);
}

function closePalettePopup(){
    const palette_popup_el = document.getElementById("palette-popup-wrapper");
    hideEl(palette_popup_el);
}

function createSizes(){
    const dropdown = document.getElementById("size-dropdown");
    for(const index in LINE_SIZE){
        const div = document.createElement("div");
        div.onclick = () => { changeSize(index) };

        if(index == 0)
            div.classList = "line-size first-size";
        else
            div.classList = "line-size";

        const label = document.createElement("label");
        label.innerHTML = `${LINE_SIZE[index]}x`;

        div.append(label);
        dropdown.append(div);
    }
}

function triggerDashed(){
    line_conf.dashed = !line_conf.dashed;
}

function triggerSizeDropdown(){
    const dropdown = document.getElementById("size-dropdown");
    const arrow = document.getElementById("size-arrow");
    instruments_popup = !instruments_popup;
    if(instruments_popup){
        dropdown.style.visibility = "visible";
        dropdown.style.opacity = 1;
        arrow.style.transform = "rotate(180deg)";
    }else{
        dropdown.style.visibility = "hidden";
        dropdown.style.opacity = 0;
        arrow.style.transform = "rotate(0deg)";
    }
}

function triggerInstrumentDropdown(){
    const dropdown = document.getElementById("instruments-dropdown");
    const arrow = document.getElementById("instruments-arrow");
    line_size_popup = !line_size_popup;
    if(line_size_popup){
        dropdown.style.visibility = "visible";
        dropdown.style.opacity = 1;
        arrow.style.transform = "rotate(180deg)";
    }else{
        dropdown.style.visibility = "hidden";
        dropdown.style.opacity = 0;
        arrow.style.transform = "rotate(0deg)";
    }
}

function changeSize(index){
    const line_sizes = document.getElementsByClassName("line-size");

    for(const line_size of line_sizes)
        line_size.style.backgroundColor = "transparent";

    line_sizes[index].style.backgroundColor = "skyblue";
    line_conf.size = LINE_SIZE[index];
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

function leaveGame(){
    storage.changePlayerData();
    location.pathname = `/`;
}