class Canvas{
    constructor(local_game , canvas){
        this.local_game = local_game;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")
        this.canvas_width = C_WIDTH;
        this.canvas_height = C_HEIGHT;
        this.zoom = 100;
        this.figures = [];


        this.cur_figure = undefined;
    }

    resetCanvas(){
        this.ctx.clearRect(0 , 0 , this.canvas_width , this.canvas_height);
    }

    listenForEvents(){
        this.canvas.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        this.canvas.addEventListener("mousedown" , (e) => {
            if(this.local_game.tools.pen || this.local_game.tools.rubber){
                let pen_color;
                if(e.button === 0){
                    pen_color = this.local_game.tools.pen ? game.color1.color : game.color2.color;
                }else{
                    pen_color = this.local_game.tools.pen ? game.color2.color : game.color1.color;
                }

                const default_width = this.local_game.tools.pen ? PEN_THICKNESS : RUBBER_THICKNESS;
                this.cur_figure = new CustomLine(this.canvas , this.ctx , default_width , game.line_conf);
                this.cur_figure.startLine(e.offsetX , e.offsetY , pen_color);
            }else
                this.cur_figure = undefined;

        });

        this.canvas.addEventListener("mousemove" , (e) => {
            if(!this.cur_figure)return;
            
            if(this.local_game.tools.pen || this.local_game.tools.rubber)
                this.cur_figure.updateLine(e.offsetX , e.offsetY);            
        })

        this.canvas.addEventListener("mouseup" , () => {
            if(this.local_game.tools.pen || this.local_game.tools.rubber){
                this.figures.push(this.cur_figure);
                this.cur_figure.finishLine();
                this.cur_figure = undefined;
            }
        })
    }
}