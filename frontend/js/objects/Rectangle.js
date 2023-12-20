class Rectangle {
  constructor(line_conf, border_color, image_data) {
    this.line_conf = line_conf;
    this.border_color = border_color;
    this.image_data = image_data;

    this.canvas = game_canvas;
    this.ctx = game_ctx;
    this.width = line_conf.size;
    this.dashed = line_conf.dashed;

    this.from_coords = {};
    this.bottom_coords = {};
  }

  startRectangle(fromX, fromY) {
    this.from_coords = { x: fromX, y: fromY };
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

  updateRectangle(toX, toY) {
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

  finishRectangle(toX, toY) {
    this.bottom_coords = { x: toX, y: toY };
    this.ctx.closePath();
  }
}
