function gameControl(socket , io){
    socket.on("create-figure" , (game_code , main_data , player_id , figure_type , image_data) => {
        socket.to(`party ${game_code}`).emit("figure-created" , main_data , player_id , figure_type , image_data);
    })

    socket.on("update-figure" , (game_code , custom_data, updater_id , image_data) => {
        socket.to(`party ${game_code}`).emit("figure-updated" , custom_data , updater_id , image_data);
    })

    socket.on("finish-figure" , (game_code , finisher_id) => {
        socket.to(`party ${game_code}`).emit("figure-finished" , finisher_id);
    })
}

module.exports = gameControl;