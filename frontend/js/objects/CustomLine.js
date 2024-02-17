class CustomLine{
    constructor(default_width , line_conf , type , color){
        this.default_width = default_width;
        this.line_conf = line_conf;
        this.type = type;
        this.color = color;

        this.canvas2 = document.createElement("canvas");
        this.ctx2 = this.canvas2.getContext('2d');

        this.canvas = game_canvas;
        this.ctx = game_ctx;
        
        this.width = default_width * line_conf.size;
        this.dashed = (type == "rubber") ? false : line_conf.dashed;

        this.start_point = {};
        this.lines = [];
    }

    startLine(x , y){
        this.canvas2.width = this.canvas.canvas_width;
        this.canvas2.height = this.canvas.canvas_height;
        this.canvas2.style.backgroundColor = 'transparent';

        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.lineWidth = this.width;

        if(this.dashed)
            this.ctx.setLineDash([DASH_LENGTH * this.line_conf.size , GAP_LENGTH * this.line_conf.size]);
        else
            this.ctx.setLineDash([]);

        this.ctx.moveTo(x , y);
        this.start_point = {x: x , y: y};

        this.ctx.fillRect(x - this.width / 2 , y - this.width / 2 , this.width , this.width);

        //------------------

        this.ctx2.beginPath();
        this.ctx2.strokeStyle = this.color;
        this.ctx2.fillStyle = this.color;
        this.ctx2.lineWidth = this.width;

        if(this.dashed)
            this.ctx2.setLineDash([DASH_LENGTH * this.line_conf.size , GAP_LENGTH * this.line_conf.size]);
        else
            this.ctx2.setLineDash([]);

        this.ctx2.moveTo(x , y);

        this.ctx2.fillRect(x - this.width / 2 , y - this.width / 2 , this.width , this.width);
    }

    updateLine(x , y){
        this.ctx.lineTo(x , y);
        this.ctx.stroke();

        this.ctx2.lineTo(x , y);
        this.ctx2.stroke();
        this.lines.push({x: x , y: y});
    }

    finishLine(){
        // this.copy_ctx.putImageData(img_data , 0 , 0);

        this.ctx2.closePath();
        this.ctx.closePath();
    }
}