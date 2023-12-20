function colorPicking(ev) {
  let colorPicker = new ColorPicker(color1.color);
  colorPicker.pickColor(ev.offsetX, ev.offsetY);
}
