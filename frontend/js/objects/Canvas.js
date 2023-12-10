class Canvas{
    constructor(){
        this.canvas = game_canvas;
        this.ctx = game_ctx;
        this.canvas_width = C_WIDTH;
        this.canvas_height = C_HEIGHT;
        this.zoom = 100;
        this.figures_data = [];
        
        this.canvas_data = undefined;
        this.cur_figure = undefined;
        this.figure_type = undefined;
    }

    listenForSockets(){
        socket.on("figure-created" , (main_data , creator_id , figure_type , image_data) => {
            this.createFigure(main_data , creator_id , figure_type , image_data);
        });

        socket.on("figure-updated" , (custom_data , updater_id , image_data) => {
            this.updateFigure(custom_data , updater_id , image_data);
        });
        
        socket.on("figure-finished" , (finisher_id) => {
            this.finishFigure(finisher_id);
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
                this.createFigure(this.cur_figure.getMainData() , player.id , this.figure_type , this.canvas_data);
                socket.emit("create-figure" , player.party.code , this.cur_figure.getMainData() ,  player.id , this.figure_type , this.canvas_data);
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
                this.updateFigure(this.cur_figure.getCustomData() , player.id , this.canvas_data);
                socket.emit("update-figure" , player.party.code , this.cur_figure.getCustomData() ,  player.id , this.canvas_data);
            }

        });

        this.canvas.addEventListener("mouseup" , (e) => {
            if(this.cur_figure){
                this.finishFigure(player.id);
                socket.emit("finish-figure" , player.party.code ,  player.id);    
            }

            switch(tool){
                case PEN:
                case RUBBER:
                    finishCustomLine(this , e);
                    break;
                default:
                    break;
            }

        });
    }

    createFigure(main_data , creator_id , figure_type , image_data){
        const img = new Image();
        img.src = image_data;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);

        };

        const figure_data = {
            figure: undefined , 
            creator: creator_id ,
            active: true ,
            editing: true , 
        }

        let constructor_data = Object.values(main_data);

        switch(figure_type){
            case RUBBER:
            case PEN:
                figure_data.figure = new CustomLine(...constructor_data);
                break;
        }

        this.figures_data.push(figure_data);
    }

    updateFigure(custom_data , updater_id , image_data){
        const img = new Image();
        img.src = image_data;
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);

        };
        
        for(const figure_data of this.figures_data)
            if(figure_data.creator == updater_id && figure_data.editing)
                figure_data.figure.updateCustomData(custom_data);
        
        this.canvas_data = image_data;
    }

    finishFigure(finisher_id){
        for(const figure_data of this.figures_data)
            if(figure_data.creator == finisher_id && figure_data.editing)
                figure_data.editing = false;        
    }

    redrawCanvas(){
        this.ctx.clearRect(0 , 0 , this.canvas_width , this.canvas_height);
        for(const figure_data of this.figures_data)
            figure_data.figure.draw();
    }
}