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
}

module.exports = gameControl;