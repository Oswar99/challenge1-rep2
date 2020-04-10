import {Application} from "express";
import {DireccionService} from "../services/direccion.service"

export class DireccionController{
    private dir_service: DireccionService;
    constructor(private app: Application){
        this.dir_service =  new DireccionService();
        this.routes();
    }

    private routes(){
        
    }
}
