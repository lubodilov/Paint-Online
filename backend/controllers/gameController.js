function gameControl(socket , io){
    socket.on("create-figure" , (game_code , image_data) => {
        socket.to(`party ${game_code}`).emit("figure-created" , image_data);
    })

    socket.on("update-figure" , (game_code , image_data) => {
        socket.to(`party ${game_code}`).emit("figure-updated" , image_data);
    })

    socket.on("finish-figure" , (game_code , image_data) => {
        socket.to(`party ${game_code}`).emit("figure-finished" , image_data);
    })

    socket.on("update-history" , (game_code , history_index) => {
        socket.to(`party ${game_code}`).emit("history-updated" , history_index);
    })
}

module.exports = gameControl;