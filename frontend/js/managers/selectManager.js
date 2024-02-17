function startSelect(c, ev) {

    if (c.select_obj) return;
    
    console.log("start");

    const image_data = c.ctx.getImageData(0, 0, c.canvas_width, c.canvas_height);

    c.cur_figure = new Select(image_data);
    c.cur_figure.startSelect(ev.offsetX, ev.offsetY);
  
    // c.updateCanvas(c.cur_canvas_data);
    // socket.emit("create-figure", player.party.code, c.cur_canvas_data);
  }
  
  function updateSelect(c, ev) {
    if (!c.cur_figure || c.select_obj) return;

    console.log("update");
 
    c.ctx.clearRect(0, 0, c.canvas_width, c.canvas_height);
    c.cur_figure.updateSelect(ev.offsetX, ev.offsetY);
  
    c.updateCanvas(c.cur_canvas_data);
    // socket.emit("update-figure", player.party.code, c.cur_canvas_data);
  }
  
  function finishSelect(c, ev) {
    if (!c.cur_figure || c.select_obj) return;

    console.log("finish");

    c.cur_figure.finishSelect(ev.offsetX, ev.offsetY);
  
    // c.finishFigure(c.cur_canvas_data);
    // socket.emit("finish-figure", player.party.code, c.cur_canvas_data);

    c.finished = true;
    c.select_obj = c.cur_figure;
    console.log(c.cur_figure)
    c.cur_figure = undefined;
  }

  function toggleSelect(c , ev){
    console.log(c.select_obj)
    if(!c.select_obj)return;
    if(c.finished){
      c.finished = false;
      return;
    }

    console.log("click");

    const cur_figure = c.select_obj;

    if(!(ev.offsetX >= Math.min(cur_figure.from_coords.x , cur_figure.bottom_coords.x)
       && ev.offsetX <= Math.max(cur_figure.from_coords.x , cur_figure.bottom_coords.x)
       && ev.offsetY >= Math.min(cur_figure.from_coords.y , cur_figure.bottom_coords.y)
       && ev.offsetY <= Math.max(cur_figure.from_coords.y , cur_figure.bottom_coords.y))){

    c.ctx.clearRect(0 , 0 , c.canvas_width , c.canvas_height);

    c.ctx.putImageData(cur_figure.image_data, 0, 0);
    c.updateCanvas(cur_figure.image_data);

    c.select_obj = undefined;
    }
}