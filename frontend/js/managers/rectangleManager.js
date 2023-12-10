function startRectangle(c , ev){
    let border_color;
    let inner_color;
    if(color1.selected){
        inner_color = (ev.button == 0) ? color1.color : color2.color;
        border_color = (ev.button == 0) ? color2.color : color1.color;
    }else if(color2.selected){
        inner_color = (ev.button == 0) ? color2.color : color1.color;
        border_color = (ev.button == 0) ? color1.color : color2.color;
    }else{
        if(tool == PEN){
            inner_color = (ev.button == 0) ? color1.color : color2.color;
            border_color = (ev.button == 0) ? color2.color : color1.color;
        }else{
            inner_color = (ev.button == 0) ? color2.color : color1.color;
            border_color = (ev.button == 0) ? color1.color : color2.color;
        }
    }
    const image_data = c.ctx.getImageData(0 , 0 , c.canvas_width , c.canvas_height);
    c.cur_figure = new Rectangle(line_conf , border_color , inner_color , image_data);
    c.cur_figure.startRectangle(ev.offsetX , ev.offsetY);
}

function updateRectangle(c , ev){
    if(!c.cur_figure)return;
    c.ctx.clearRect(0 , 0 ,c.canvas_width , c.canvas_height);
    c.cur_figure.updateRectangle(ev.offsetX , ev.offsetY);
}

function finishRectangle(c , ev){
    if(!c.cur_figure)return;
    c.cur_figure.finishRectangle(ev.offsetX , ev.offsetY);
    c.cur_figure = undefined;
}