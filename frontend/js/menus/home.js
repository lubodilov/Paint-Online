let player;
let cur_popup;

// window.onload = () => {
    player = new Player(generateRandomId(8) , generateRandomGuest(4) , './assets/guest.png');
    player.setupPlayer();
// }

function showEl(el){
    el.style.opacity = "1";
    el.style.visibility = "visible";
}

function hideEl(el){
    el.style.opacity = "0";
    el.style.visibility = "hidden";
}

function openCoopPopup(){
    if(cur_popup)return;
    cur_popup = "main";
    const popup_el = document.getElementById("coop-popup");
    showEl(popup_el);
  
}

function closeCoopPopup(){
    cur_popup = undefined;
    const popup_el = document.getElementById("coop-popup");
    hideEl(popup_el);
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
    cur_popup = "joined";
    const code = document.getElementById("code-input").value;
    
    // openJoinedPopup();
    // player.joinMatch(code);
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
    cur_popup = "created";
    player.createMatch();
    
}