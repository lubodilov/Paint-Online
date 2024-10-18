function startCustomLine(c , ev){
    let default_width;
    if(tool == PEN)default_width = PEN_THICKNESS;
    if(tool == RUBBER)default_width = RUBBER_THICKNESS;
    if(tool == BRUSH)default_width = BRUSH_THICKNESS;
    
    const type = tool;
    
    let color;
    if(color1.selected)
        color = (ev.button == 0) ? color1.color : color2.color;
    else if(color2.selected)
        color = (ev.button == 0) ? color2.color : color1.color;
    else{
        if(tool == RUBBER)
            color = (ev.button == 0) ? color2.color : color1.color;
        else
            color = (ev.button == 0) ? color1.color : color2.color;
    }

    c.cur_figure = new CustomLine(default_width , line_conf , type , color);
    c.cur_figure.startLine(ev.offsetX , ev.offsetY);

    c.updateCanvas(c.cur_canvas_data);

    if(player.party.max_players > 1)
        socket.emit("create-figure" , player.party.code , c.cur_canvas_data);
}

function updateCustomLine(c , ev){
    if(!c.cur_figure)return;
    c.cur_figure.updateLine(ev.offsetX , ev.offsetY);

    c.updateCanvas(c.cur_canvas_data);

    if(player.party.max_players > 1)
        socket.emit("update-figure" , player.party.code , c.cur_canvas_data);
}

function finishCustomLine(c){
    if(!c.cur_figure)return;

    if(c.cur_figure){
        c.finishFigure(c.cur_canvas_data);
        if(player.party.max_players > 1)
            socket.emit("finish-figure" , player.party.code , c.cur_figure.canvas2.toDataURL("image/png"));
    }

    c.cur_figure = undefined;
}