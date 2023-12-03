class CustomLine{
    constructor(canvas , ctx , width){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;

        this.lines = [];
        this.start_point = {x: 0 , y: 0};
    }

    startLine(x , y , color){
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x , y);
        this.start_point = {x: x , y: y};
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
        for(const line of this.lines){
            this.ctx.lineTo(line.x , line.y);
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }
}