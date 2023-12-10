class CustomLine{
    constructor(default_width , line_conf , type , color){
        this.default_width = default_width;
        this.line_conf = line_conf;
        this.type = type;
        this.color = color;

        this.canvas = game_canvas;
        this.ctx = game_ctx;
        
        this.width = default_width * line_conf.size;
        this.dashed = (type == "rubber") ? false : line_conf.dashed;

        this.start_point = {};
        this.lines = [];
    }

    getMainData(){
        const data = {
            default_width: this.default_width ,
            line_conf: this.line_conf ,
            type: this.type ,
            color: this.color
        }

        return data;
    }

    getCustomData(){
        const data = {
            start_point: this.start_point , 
            lines: this.lines
        }

        return data;
    }

    updateCustomData(data){
        this.start_point = data.start_point;
        this.lines = data.lines;
    }

    startLine(x , y){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.lineWidth = this.width;

        if(this.dashed)
            this.ctx.setLineDash([DASH_LENGTH , GAP_LENGTH]);
        else
            this.ctx.setLineDash([]);

        this.ctx.moveTo(x , y);
        this.start_point = {x: x , y: y};

        this.ctx.fillRect(x - this.width / 2 , y - this.width / 2 , this.width , this.width);
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
        
        this.ctx.strokeStyle = this.color;
        this.ctx.fillStyle = this.color;
        this.ctx.lineWidth = this.width;

        if(this.dashed)
            this.ctx.setLineDash([DASH_LENGTH , GAP_LENGTH]);
        else
            this.ctx.setLineDash([]);

        this.ctx.moveTo(this.start_point.x , this.start_point.y);
        this.ctx.fillRect(this.start_point.x - this.width / 2  , this.start_point.y  - this.width / 2 , this.width , this.width);
        for(const line of this.lines){
            this.ctx.lineTo(line.x , line.y);
            this.ctx.stroke();
        }
        this.ctx.closePath();
    }
}