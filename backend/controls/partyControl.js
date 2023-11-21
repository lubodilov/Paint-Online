let parties = new Map();

function partyControl(socket , io){
    socket.on("hi" , (obj) => {
        console.log(obj)
    })

    socket.on('create-party' , (party) => {
        parties.set(`${party.code}` , party);
        console.log("party created");
    });

    socket.on("delete-party" , (party_id) => {
        parties.delete(`${party_id}`);
        console.log("party deleted")
        io.emit("party-deleted" , party_id);
    });

    socket.on("update-party" , (party_id , party) => {
        parties.set(`${party_id}` , party);
        console.log("party updated")

        io.emit("party-updated" , party_id , party);
    });
}

module.exports = {partyControl};