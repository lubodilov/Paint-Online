function startTriangle(c , ev){
    let color;
    if (color1.selected) {
      color = ev.button == 0 ? color1.color : color2.color;
    } else if (color2.selected) {
      color = ev.button == 0 ? color2.color : color1.color;
    } else {
      color = ev.button == 0 ? color1.color : color2.color;
    }
    
    const image_data = c.ctx.getImageData(0, 0, c.canvas_width, c.canvas_height);
    c.cur_figure = new Triangle(line_conf, color, image_data);
    c.cur_figure.startTriangle(ev.offsetX, ev.offsetY);
  
    c.updateCanvas(c.cur_canvas_data);
    socket.emit("create-figure", player.party.code, c.cur_canvas_data);
}

function updateTriangle(c , ev){
    if (!c.cur_figure) return;
    c.ctx.clearRect(0, 0, c.canvas_width, c.canvas_height);
    c.cur_figure.updateTriangle(ev.offsetX, ev.offsetY);

    c.updateCanvas(c.cur_canvas_data);
    socket.emit("update-figure", player.party.code, c.cur_canvas_data);
}

function finishTriangle(c , ev){
  if (!c.cur_figure) return;
  c.cur_figure.finishTriangle(ev.offsetX, ev.offsetY);

  c.finishFigure(c.cur_canvas_data);
  socket.emit("finish-figure", player.party.code, c.cur_canvas_data);

  c.cur_figure = undefined;
}