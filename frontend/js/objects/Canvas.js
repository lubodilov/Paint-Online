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
        this.canvas.addEventListener("mousedown" , (e) => {
            if(this.local_game.tools.pen){
                this.cur_figure = new CustomLine(this.canvas , this.ctx , game.line_conf.size);
                this.cur_figure.startLine(e.offsetX , e.offsetY , "black");
            }else
                this.cur_figure = undefined;
        });

        this.canvas.addEventListener("mousemove" , (e) => {
            if(!this.cur_figure)return;
            
            if(this.local_game.tools.pen)
                this.cur_figure.updateLine(e.offsetX , e.offsetY);            
        })

        this.canvas.addEventListener("mouseup" , () => {
            if(this.local_game.tools.pen){
                this.figures.push(this.cur_figure);
                this.cur_figure.finishLine();
                this.cur_figure = undefined;
            }
        })
    }
}