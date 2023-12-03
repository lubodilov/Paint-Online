class Game{
    constructor(local_player , canvas){
        //Main
        this.local_player = local_player;
        this.party = local_player.party;
        this.canvas = new Canvas(canvas);


        //Copy , Cut , Paste , Delete
        this.selected_figure = undefined;

        //Tools
        this.tools = {
            pen: false ,
            color_picker: false ,
            rubber: false ,
            text: false ,
            bucket: false ,
            select: false
        }

        this.line_conf = {
            dashed: false ,
            size: LINE_SIZE[0]
        }

        this.instruments = {
            brush: false , 
            spray: false
        }

        this.shapes = {
            line: false ,
            circle: false ,
            triangle: false ,
            rectangle: false ,
            curved_line: false ,
            custom_shape: false
        }

        this.color1 = {
            color: "black" , 
            selected: false ,
            html_el: document.getElementById("color1_color")
        }

        this.color2 = {
            color: "white" , 
            selected: false ,
            html_el: document.getElementById("color2_color")
        }

        this.colors = STARTING_COLORS;
    }

    listenForEvents(){

    }
}