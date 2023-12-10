function startCustomLine(c , ev){
    const default_width = (tool == PEN) ? PEN_THICKNESS : RUBBER_THICKNESS;
    const type = (tool == PEN) ? PEN : RUBBER;
    let color;
    if(color1.selected)
        color = (ev.button == 0) ? color1.color : color2.color;
    else if(color2.selected)
        color = (ev.button == 0) ? color2.color : color1.color;
    else{
        if(tool == PEN)
            color = (ev.button == 0) ? color1.color : color2.color;
        else
            color = (ev.button == 0) ? color2.color : color1.color;
    }

    c.cur_figure = new CustomLine(default_width , line_conf , type , color);
    c.figure_type = PEN;

  
    c.cur_figure.startLine(ev.offsetX , ev.offsetY);
}

function updateCustomLine(c , ev){
    if(!c.cur_figure)return;
    c.cur_figure.updateLine(ev.offsetX , ev.offsetY);
}

function finishCustomLine(c){
    if(!c.cur_figure)return;
    c.cur_figure = undefined;
    // c.figures.push()
}