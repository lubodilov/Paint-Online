let cur_popup;

storage.setupStorage();
if(storage.player_conf)
    player = new Player(storage.player_conf.id , storage.player_conf.name , storage.player_conf.image);
else
    player = new Player(generateRandomId(8) , generateRandomGuest(4) , './assets/guest.png');

player.setupPlayer();
storage.savePlayerData(player);
storage.listenForChange();

createSelectPlayersNumber(MIN_PLAYER_NUMBER , MAX_PLAYER_NUMBER);

function createSelectPlayersNumber(min_p , max_p){
    const selectElement = document.getElementById("players-select");

    for(let i = min_p; i <= max_p;i++){
        const option = document.createElement("option");
        option.innerHTML = i;
        option.value = i;

        selectElement.append(option);
    }
}

function closeSoloPopup(){
    cur_popup = undefined;
    const popup_el = document.getElementById("solo-popup");
    hideEl(popup_el);
}

function openSoloPopup(){
    if(cur_popup)return;
    cur_popup = "solo";
    const popup_el = document.getElementById("solo-popup");
    showEl(popup_el);
}

function closeCoopPopup(){
    cur_popup = undefined;
    const popup_el = document.getElementById("coop-popup");
    hideEl(popup_el);
}

function openCoopPopup(){
    if(cur_popup)return;
    cur_popup = "main";
    const popup_el = document.getElementById("coop-popup");
    showEl(popup_el);
}

function openJoinParty(){
    closeCoopPopup();
    cur_popup = "join";
    const popup_el = document.getElementById("coop-join");
    showEl(popup_el);
}

function closeJoinParty(){
    cur_popup = undefined;
    const popup_el = document.getElementById("coop-join");
    hideEl(popup_el);
}

function joinMatch(){
    closeJoinParty();

    cur_popup = "joined";
    const code = document.getElementById("code-input").value;
    
    // openJoinedPopup();
    const popup_el = document.getElementById("coop-party");
    showEl(popup_el);

    player.joinMatch(code , leaveParty);
}


function openCreateParty(){
    closeCoopPopup();
    cur_popup = "create";
    const popup_el = document.getElementById("coop-create");
    showEl(popup_el);
}

function closeCreateParty(){
    cur_popup = undefined;
    const popup_el = document.getElementById("coop-create");
    hideEl(popup_el);
}

function createMatch(){
    closeCreateParty();

    cur_popup = "created";
    const selectElement = document.getElementById("players-select");
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];
    const players_max_num = selectedOption.value;

    player.createMatch(players_max_num);

    const popup_el = document.getElementById("coop-party");
    showEl(popup_el);
}

function leaveParty(){
    cur_popup = undefined;
    const popup_el = document.getElementById("coop-party");
    hideEl(popup_el);

    player.leaveMatch()
}

function startSoloGame(){
    player.createMatch(1);
    player.party.startGame();
    
}

function startCoopGame(){
    player.party.startGame();
}