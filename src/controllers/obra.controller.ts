import {Application} from "express";
import {ObraService} from "../services/obra.service";

export class ProveedorController{
    private obra_service: ObraService;
    constructor(private app: Application){
        this.obra_service =  new ObraService();
        this.routes();
    }

    private routes(){
        
    }
}