let parties = new Map();

function partyControl(socket , io){
    socket.on("join-party" , (code) => {
        console.log("player joined room!");
        socket.join(`party ${code}`);
    })

    socket.on("leave-party" , (code) => {
        console.log("player left room!");
        socket.leave(`party ${code}`);
    })

    socket.on('create-party' , (party) => {
        parties.set(`${party.code}` , party);
    });

    socket.on('search-party' , (code) => {
        const party = parties.get(`${code}`);
        socket.emit("party-searched" , party);
    })


    socket.on("delete-party" , (party_id) => {
        parties.delete(`${party_id}`);
    });

    socket.on("update-party" , (party_id , party) => {
        parties.set(`${party_id}` , party);
        socket.to(`party ${party_id}`).emit("party-updated" , party);
        socket.emit("party-updated" , party);
    });

    socket.on("start-game" , (code) => {
        socket.to(`party ${code}`).emit("game-started");
        socket.emit("game-started");
    })
}

module.exports = partyControl;