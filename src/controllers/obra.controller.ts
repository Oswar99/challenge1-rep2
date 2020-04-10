import {Application} from "express";
import {ObraService} from "../services/obra.service";

export class ObraController{
    private obra_service: ObraService;
    constructor(private app: Application){
        this.obra_service =  new ObraService();
        this.routes();
    }

    private routes(){
        this.app.route("/obras").get(this.obra_service.getAll);
        
        this.app.route("/obra").post(this.obra_service.New);

        this.app.route("/obra/:id")
        .get(this.obra_service.getById)
        .put(this.obra_service.Update)
        .delete(this.obra_service.Delete);
    }
}