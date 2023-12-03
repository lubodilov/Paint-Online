class CustomLine{
    constructor(canvas , ctx , default_width , line_conf){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = default_width * line_conf.size;
        this.dashed = line_conf.dashed;

        this.lines = [];
        this.start_point = {};
    }

    startLine(x , y , color){
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;

        this.ctx.moveTo(x , y);
        this.start_point = {x: x , y: y};

        console.log(color)
        this.ctx.strokeRect(x - this.width / 2 , y - this.width / 2 , this.width , this.width);

        if(this.dashed)
            this.ctx.setLineDash([DASH_LENGTH , GAP_LENGTH]);
    }

    updateLine(x , y){
        this.ctx.lineTo(x , y);
        this.ctx.stroke();
        this.lines.push({x: x , y: y});
    }

    finishLine(){
        this.ctx.closePath();
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.start_point.x , this.start_point.y);
        this.ctx.fillRect(this.start_point.x , this.start_point.y , - this.width / 2 , y - this.width / 2 , this.width , this.width);
        for(const line of this.lines){
            this.ctx.lineTo(line.x , line.y);
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }
}