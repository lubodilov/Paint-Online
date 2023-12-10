function gameControl(socket , io){
    socket.on("create-figure" , (game_code , main_data , player_id , figure_type) => {
        socket.to(`party ${game_code}`).emit("figure-created" , main_data , player_id , figure_type);
    })

    socket.on("update-figure" , (game_code , custom_data, updater_id) => {
        socket.to(`party ${game_code}`).emit("figure-updated" , custom_data , updater_id);
    })

    socket.on("finish-figure" , (game_code , finisher_id) => {
        socket.to(`party ${game_code}`).emit("figure-finished" , finisher_id);
    })
}

module.exports = gameControl;