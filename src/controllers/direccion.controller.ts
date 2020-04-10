import {Application} from "express";
import {DireccionService} from "../services/direccion.service"

export class DireccionController{
    private dir_service: DireccionService;
    constructor(private app: Application){
        this.dir_service =  new DireccionService();
        this.routes();
    }

    private routes(){
        this.app.route("/direcciones").get(this.dir_service.getAll);
        
        this.app.route("/direccion").post(this.dir_service.New);

        this.app.route("/direccion/:id")
        .get(this.dir_service.getById)
        .put(this.dir_service.Update)
        .delete(this.dir_service.Delete);
    }
}
