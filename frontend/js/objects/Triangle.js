class Triangle {
    constructor(line_conf, border_color, image_data) {
      this.line_conf = line_conf;
      this.border_color = border_color;
      this.image_data = image_data;
  
      this.canvas = game_canvas;
      this.ctx = game_ctx;
      this.width = line_conf.size;
      this.dashed = line_conf.dashed;
  
      this.start_coords = {};
      this.cur_coord_main = {};
      this.cur_coord_second = {};
    }
  
    startTriangle(fromX, fromY) {
      this.start_coords = { x: fromX, y: fromY };
      this.ctx.putImageData(this.image_data, 0, 0);
  
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.border_color;
  
      if (this.dashed)
        this.ctx.setLineDash([
          DASH_LENGTH * this.line_conf.size,
          GAP_LENGTH * this.line_conf.size,
        ]);
      else this.ctx.setLineDash([]);
    }

    updateTriangle(mainX , mainY){
        this.ctx.beginPath();

        this.ctx.strokeStyle = this.border_color;
        this.ctx.lineWidth = this.width;

        this.ctx.putImageData(this.image_data, 0, 0);
        this.cur_coord_main = { x: mainX , y: mainY };
        
        const secondX = (this.start_coords.x - (mainX + - this.start_coords.x));
        const secondY = mainY;

        this.cur_coord_second = { x: secondX , y: secondY };

        this.ctx.moveTo(this.start_coords.x , this.start_coords.y);
        this.ctx.lineTo(this.cur_coord_main.x , this.cur_coord_main.y);
        this.ctx.lineTo(this.cur_coord_second.x , this.cur_coord_second.y);
        this.ctx.lineTo(this.start_coords.x , this.start_coords.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    finishTriangle(mainX, mainY){
        this.updateTriangle(mainX , mainY);
    }
}  