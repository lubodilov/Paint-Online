//TODO Validation if a person is joining the route by typing it and the route not containing a real party

createColors();

const player_data = storage.getPlayerData();
const party_data = storage.getPartyData();
const canvas = document.getElementById("gameCanvas");

player = new Player(player_data.id, player_data.name, player_data.image);
player.party = new Party(
  party_data.code,
  party_data.creator_id,
  party_data.creator_name,
  party_data.player_ids,
  party_data.player_names,
  party_data.max_players,
  player
);
game = new Game(player, canvas);

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

// game.listenForSockets();
game.listenForEvents();
