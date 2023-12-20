let player;
let canvas;


//Copy , Cut , Paste , Delete
let selected_figure = undefined;
let tool = NONE;

let line_conf = {
    dashed: false ,
    size: LINE_SIZE[0]
}

let color1 = {
    color: "black" , 
    selected: false ,
    html_el: document.getElementById("color1_color")
}

let color2 = {
    color: "white" , 
    selected: false ,
    html_el: document.getElementById("color2_color")
}

let colors = STARTING_COLORS;
let selected_palette_color = undefined;

let figures = [];



let line_size_popup = false;
let instruments_popup = false;