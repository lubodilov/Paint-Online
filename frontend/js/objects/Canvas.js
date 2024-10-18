class Canvas {
  constructor() {
    this.canvas = game_canvas;
    this.ctx = game_ctx;
    this.canvas_width = C_WIDTH;
    this.canvas_height = C_HEIGHT;
    this.zoom = 100;

    this.cur_figure = undefined;
    this.select_obj = undefined;
    this.cur_canvas_data = undefined;
    this.all_canvas_data = [
      this.ctx.getImageData(0, 0, this.canvas_width, this.canvas_height),
    ];
    this.cur_canvas_index = 0;
  }

  listenForSockets() {
    socket.on("figure-created", (image_data) => {
      this.updateCanvas(image_data);
    });

    socket.on("figure-updated", (image_data) => {
      this.updateCanvas(image_data);
    });

    socket.on("figure-finished", (image_data) => {
      this.finishFigure(image_data);
    });

    socket.on("history-updated", (history_index) => {
      this.cur_canvas_index = history_index;
      this.changeCanvas(this.all_canvas_data[this.cur_canvas_index]);
    });
  }

  listenForEvents() {
    this.canvas.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });

    this.canvas.addEventListener("mousedown", (e) => {
      switch (tool) {
        case PEN:
        case RUBBER:
        case BRUSH:
          startCustomLine(this, e);
          break;
        case TRIANGLE:
          startTriangle(this, e);
          break;
        case RECTANGLE:
          startRectangle(this, e);
          break;
        case LINE:
          startLine(this, e);
          break;
        case CIRCLE:
          startCircle(this, e);
          break;
        case CUSTOM_SHAPE:
          startCustomShape(this, e);
          break;
        case SELECT:
          startSelect(this , e);
          break;
        default:
          return;
      }

      this.cur_canvas_data = this.canvas.toDataURL("image/png");
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.cur_figure) return;

      switch (tool) {
        case PEN:
        case RUBBER:
        case BRUSH:
          updateCustomLine(this, e);
          break;
        case TRIANGLE:
          updateTriangle(this, e);
          break;
        case RECTANGLE:
          updateRectangle(this, e);
          break;
        case LINE:
          updateLine(this, e);
          break;
        case CIRCLE:
          updateCircle(this, e);
          break;
        case CUSTOM_SHAPE:
          updateCustomShape(this, e);
          break;
        case SELECT:
          updateSelect(this , e);
          break;
        default:
          return;
      }

      this.cur_canvas_data = this.canvas.toDataURL("image/png");
    });

    this.canvas.addEventListener("mouseup", (e) => {
      switch (tool) {
        case PEN:
        case RUBBER:
        case BRUSH:
          finishCustomLine(this, e);
          break;
        case TRIANGLE:
          finishTriangle(this, e);
          break;
        case RECTANGLE:
          finishRectangle(this, e);
          break;
        case LINE:
          finishLine(this, e);
          break;
        case CIRCLE:
          finishCircle(this, e);
          break;
        case CUSTOM_SHAPE:
          finishCustomShape(this, e);
          if (e.offsetX - lines[0] > 5 || e.offsetY - lines[1] > 5) {
            startCustomShape(this, e);
          }
          break;
        case SELECT:
          finishSelect(this , e);
          break;
        default:
          return;
      }
    });

    this.canvas.addEventListener("click", (e) => {
      switch (tool) {
        case COLOR_PICKER:
          colorPicking(e);
          break;
        case SELECT:
          toggleSelect(this , e);
          break;
        default:
          return;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "p") {
        finishCustomShape(this, e);
      }
      if (e.ctrlKey && e.key === "z")
        if (this.cur_canvas_index > 0) this.cur_canvas_index--;

      if (e.ctrlKey && e.key === "y")
        if (this.cur_canvas_index < this.all_canvas_data.length - 1)
          this.cur_canvas_index++;

      socket.emit("update-history", player.party.code, this.cur_canvas_index);
      this.changeCanvas(this.all_canvas_data[this.cur_canvas_index]);
    });
  }

  updateCanvas(image_data) {
    console.log(image_data)
    this.cur_canvas_data = image_data;
    const img = new Image();
    img.src = image_data;
    img.onload = () => {
      this.ctx.clearRect(0 , 0 , this.canvas_width , this.canvas_height);
      this.ctx.drawImage(img, 0, 0);
    };
  }

  finishFigure(image_data) {
    if (this.cur_canvas_index < this.all_canvas_data.length - 1) {
      const buf = this.all_canvas_data[this.cur_canvas_index];

      while (this.all_canvas_data.length > 0) this.all_canvas_data.pop();

      this.all_canvas_data.push(buf);
      this.cur_canvas_index = 0;
    }

    this.updateCanvas(image_data);
    this.all_canvas_data.push(
      this.ctx.getImageData(0, 0, this.canvas_width, this.canvas_height)
    );
    this.cur_canvas_index++;
  }

  changeCanvas(image_data) {
    // this.ctx.clearRect(0 , 0 , this.canvas_width , this.canvas_height);
    this.ctx.putImageData(image_data, 0, 0);
  }

  cutSquare(){
    if(!this.select_obj)return;

    this.copied_image_data = this.ctx.getImageData( Math.min(this.select_obj.from_coords.x + 5 , this.select_obj.bottom_coords.x + 5) , 
                                                    Math.min(this.select_obj.from_coords.y + 5, this.select_obj.bottom_coords.y + 5) ,
                                                    Math.abs( this.select_obj.bottom_coords.x - this.select_obj.from_coords.x) - 10 ,
                                                    Math.abs( this.select_obj.bottom_coords.y - this.select_obj.from_coords.y) - 10);

    this.ctx.clearRect( Math.min(this.select_obj.from_coords.x , this.select_obj.bottom_coords.x) - 5, 
                        Math.min(this.select_obj.from_coords.y , this.select_obj.bottom_coords.y) - 5 ,
                        Math.abs( this.select_obj.bottom_coords.x - this.select_obj.from_coords.x) + 10 ,
                        Math.abs( this.select_obj.bottom_coords.y - this.select_obj.from_coords.y)+ 10);

    this.cur_canvas_data = this.canvas.toDataURL("image/png");

    socket.emit("update-figure", player.party.code, this.cur_canvas_data);


    this.select_obj = undefined;
  }

  copySquare(){
    if(!this.select_obj)return;

    this.copied_image_data = this.ctx.getImageData( Math.min(this.select_obj.from_coords.x + 5 , this.select_obj.bottom_coords.x + 5) , 
                                                    Math.min(this.select_obj.from_coords.y + 5, this.select_obj.bottom_coords.y + 5) ,
                                                    Math.abs( this.select_obj.bottom_coords.x - this.select_obj.from_coords.x) - 10 ,
                                                    Math.abs( this.select_obj.bottom_coords.y - this.select_obj.from_coords.y) - 10);

    this.ctx.putImageData(this.select_obj.image_data , 0 , 0);

    this.cur_canvas_data = this.canvas.toDataURL("image/png");

    socket.emit("update-figure", player.party.code, this.cur_canvas_data);

    this.select_obj = undefined;
  }

  deleteSquare(){
    if(!this.select_obj)return;

    this.ctx.clearRect( Math.min(this.select_obj.from_coords.x , this.select_obj.bottom_coords.x) - 5, 
                        Math.min(this.select_obj.from_coords.y , this.select_obj.bottom_coords.y) - 5 ,
                        Math.abs( this.select_obj.bottom_coords.x - this.select_obj.from_coords.x) + 10 ,
                        Math.abs( this.select_obj.bottom_coords.y - this.select_obj.from_coords.y)+ 10);

    this.cur_canvas_data = this.canvas.toDataURL("image/png");
    
    socket.emit("update-figure", player.party.code, this.cur_canvas_data);

    this.select_obj = undefined;
  }

  pasteSquare(){
    if(!this.copied_image_data)return;

    this.ctx.putImageData(this.copied_image_data , 0 , 0);
    this.cur_canvas_data = this.canvas.toDataURL("image/png");

    socket.emit("update-figure", player.party.code, this.cur_canvas_data);
  }
}
