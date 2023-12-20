var lines = [];
function startCustomShape(c, ev) {
  let color;
  if (color1.selected) {
    color = ev.button == 0 ? color1.color : color2.color;
  } else if (color2.selected) {
    color = ev.button == 0 ? color2.color : color1.color;
  } else {
    color = ev.button == 0 ? color1.color : color2.color;
  }

  const image_data = c.ctx.getImageData(0, 0, c.canvas_width, c.canvas_height);
  c.cur_figure = new Line(line_conf, color, image_data);
  c.cur_figure.startLine(ev.offsetX, ev.offsetY);
  lines.push(ev.offsetX);
  lines.push(ev.offsetY);

  c.updateCanvas(c.cur_canvas_data);
  if (player.party.max_players > 1) {
    socket.emit("create-figure", player.party.code, c.cur_canvas_data);
  }
}

function updateCustomShape(c, ev) {
  if (!c.cur_figure) return;
  c.ctx.clearRect(0, 0, c.canvas_width, c.canvas_height);
  c.cur_figure.updateLine(ev.offsetX, ev.offsetY);

  c.updateCanvas(c.cur_canvas_data);
  if (player.party.max_players > 1) {
    socket.emit("update-figure", player.party.code, c.cur_canvas_data);
  }
}

function finishCustomShape(c, ev) {
  if (ev.key == "p") {
    c.cur_figure.finishLine(lines[0], lines[1]);
  } else {
    if (ev.offsetX - lines[0] <= 5 && ev.offsetY - lines[1] <= 5) {
      c.cur_figure.finishLine(lines[0], lines[1]);
      console.log("finish");
    } else {
      if (!c.cur_figure) return;
      c.cur_figure.finishLine(ev.offsetX, ev.offsetY);
    }
  }
  c.finishFigure(c.cur_canvas_data);
  if (player.party.max_players > 1) {
    socket.emit("finish-figure", player.party.code, c.cur_canvas_data);
  }

  c.cur_figure = undefined;
}
