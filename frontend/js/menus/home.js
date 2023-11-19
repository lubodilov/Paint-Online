let player;
let cur_popup;

// window.onload = () => {
    player = new Player(generateRandomId(8) , generateRandomGuest(4) , './assets/guest.png');
    player.setupPlayer();
// }

function openCoopPopup(){
    if(cur_popup)return;
    cur_popup = "main";
    const popup_el = document.getElementById("coop-popup");
    popup_el.style.opacity = "1";
    popup_el.style.visibility = "visible";
}

function closeCoopPopup(){
    cur_popup = undefined;
    const popup_el = document.getElementById("coop-popup");
    popup_el.style.opacity = "0";
    popup_el.style.visibility = "hidden";
}

function openJoinParty(){
    closeCoopPopup();
    cur_popup = "join";
    const popup_el = document.getElementById("coop-join");
    popup_el.style.opacity = 1;
    popup_el.style.visibility = "visible";
}

function closeJoinParty(){
    cur_popup = undefined;
    const popup_el = document.getElementById("coop-join");
    popup_el.style.opacity = 0;
    popup_el.style.visibility = "hidden";
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
    popup_el.style.opacity = 1;
    popup_el.style.visibility = "visible";
}