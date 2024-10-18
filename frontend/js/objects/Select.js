class Select{
    constructor(image_data) {
      this.image_data = image_data;
  
      this.canvas = game_canvas;
      this.ctx = game_ctx;

      this.border_color = "black";

      this.width = 1;
      this.dashed = true;
  
      this.from_coords = {};
      this.bottom_coords = {};
    }
  
    startSelect(fromX, fromY) {
        this.from_coords = { x: fromX, y: fromY };
        this.ctx.putImageData(this.image_data, 0, 0);
  
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.border_color;
  
        this.ctx.setLineDash([5 , 5]);
    }
  
    updateSelect(toX, toY) {
        this.ctx.putImageData(this.image_data, 0, 0);
    
        this.ctx.strokeStyle = this.border_color;
        this.ctx.lineWidth = this.width;
    
        this.ctx.strokeRect(
            Math.min(this.from_coords.x, toX),
            Math.min(this.from_coords.y, toY),
            Math.abs(toX - this.from_coords.x),
            Math.abs(toY - this.from_coords.y)
        );
    }
  
    finishSelect(toX, toY) {
        this.bottom_coords = { x: toX, y: toY };
    }
  }