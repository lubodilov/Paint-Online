class Canvas{
    constructor(){
        this.canvas = game_canvas;
        this.ctx = game_ctx;
        this.canvas_width = C_WIDTH;
        this.canvas_height = C_HEIGHT;
        this.zoom = 100;
        
        this.cur_canvas_data = this.canvas.toDataURL('image/png');
        this.all_canvas_data = [this.cur_canvas_data];
        this.cur_canvas_index = 0;
    }

    listenForSockets(){
        socket.on("figure-created" , (image_data) => {
            this.updateCanvas(image_data);
        });

        socket.on("figure-updated" , (image_data) => {
            this.updateCanvas(image_data);
        });
        
        socket.on("figure-finished" , (image_data) => {
            this.finishFigure(image_data);
        });
    }

    listenForEvents(){
        this.canvas.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        this.canvas.addEventListener("mousedown" , (e) => {
            switch(tool){
                case PEN:
                case RUBBER:
                    startCustomLine(this , e);
                    break;
                default:
                    break;
            }

            this.canvas_data = this.canvas.toDataURL('image/png');

            if(this.cur_figure){
                this.updateCanvas(this.canvas_data);
                socket.emit("create-figure" , player.party.code , this.canvas_data);
            }
        });

        this.canvas.addEventListener("mousemove" , (e) => {
            switch(tool){
                case PEN:
                case RUBBER:
                    updateCustomLine(this , e);
                    break;
                default:
                    break;
            }

            this.canvas_data = this.canvas.toDataURL('image/png');
            
            if(this.cur_figure){
                this.updateCanvas(this.canvas_data);
                socket.emit("update-figure" , player.party.code , this.canvas_data);
            }

        });

        this.canvas.addEventListener("mouseup" , (e) => {
            switch(tool){
                case PEN:
                case RUBBER:
                    finishCustomLine(this , e);
                    break;
                default:
                    break;
            }

            if(this.cur_figure){
                this.finishFigure(this.canvas_data);
                socket.emit("update-figure" , player.party.code , this.canvas_data);
            }

        });
    }

    updateCanvas(image_data){
        const img = new Image();
        img.src = image_data;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);

        };

        this.canvas_data = image_data;
    }

    finishFigure(image_data){
        this.all_canvas_data.push(image_data);
    }
}