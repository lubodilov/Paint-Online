class Line {
  constructor(line_conf, color, image_data) {
    this.line_conf = line_conf;
    this.color = color;
    this.image_data = image_data;

    this.canvas = game_canvas;
    this.ctx = game_ctx;
    this.width = line_conf.size;
    this.dashed = line_conf.dashed;

    this.start_coords = {};
    this.end_coords = {};
  }

  startLine(fromX, fromY) {
    this.start_coords = { x: fromX, y: fromY };
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

    this.ctx.moveTo(fromX, fromY);
  }

  updateLine(toX, toY) {
    this.ctx.putImageData(this.image_data, 0, 0);
    this.ctx.beginPath();
    this.ctx.moveTo(this.start_coords.x, this.start_coords.y);
    const angle = Math.atan2(
      toY - this.start_coords.y,
      toX - this.start_coords.x
    );
    const distance = Math.sqrt(
      (toX - this.start_coords.x) ** 2 + (toY - this.start_coords.y) ** 2
    );
    const finalX = this.start_coords.x + distance * Math.cos(angle);
    const finalY = this.start_coords.y + distance * Math.sin(angle);

    this.ctx.lineTo(finalX, finalY);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  finishLine(toX, toY) {
    this.updateLine(toX, toY);
    this.end_coords = { x: toX, y: toY };
    this.ctx.closePath();
  }
}
