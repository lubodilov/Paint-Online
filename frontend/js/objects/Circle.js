class Circle {
  constructor(line_conf, color, image_data) {
    this.line_conf = line_conf;
    this.color = color;
    this.image_data = image_data;

    this.canvas = game_canvas;
    this.ctx = game_ctx;
    this.width = line_conf.size;
    this.dashed = line_conf.dashed;

    this.center_coords = {};
    this.radius = 0;
  }

  startCircle(fromX, fromY) {
    this.center_coords = { x: fromX, y: fromY };
    this.ctx.putImageData(this.image_data, 0, 0);

    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.width;

    if (this.dashed)
      this.ctx.setLineDash([
        DASH_LENGTH * this.line_conf.size,
        GAP_LENGTH * this.line_conf.size,
      ]);
    else this.ctx.setLineDash([]);
  }
  updateCircle(toX, toY) {
    this.ctx.putImageData(this.image_data, 0, 0);
    this.ctx.beginPath();

    const centerX = (this.center_coords.x + toX) / 2;
    const centerY = (this.center_coords.y + toY) / 2;
    this.radius = Math.sqrt((toX - centerX) ** 2 + (toY - centerY) ** 2);

    this.ctx.arc(this.center_coords.x , this.center_coords.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  finishCircle() {
    this.ctx.closePath();
  }
}
