class ColorPicker {
  constructor(selectedColor) {
    this.canvas = game_canvas;
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    this.selectedColor = selectedColor;
  }

  pickColor(x, y) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    this.selectedColor = this.rgbToHex(
      imageData[0],
      imageData[1],
      imageData[2]
    );

    this.changeColor();
  }

  rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  changeColor() {
    if (color1.selected) {
      color1.color = this.selectedColor;
      color1.html_el.style.backgroundColor = this.selectedColor;
    }
    if (color2.selected) {
      color2.color = this.selectedColor;
      color2.html_el.style.backgroundColor = this.selectedColor;
    }
  }
}
