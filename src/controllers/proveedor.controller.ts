import {Application} from "express";
import {ProveedorService} from "../services/proveedor.service";

export class ProveedorController{
    private prov_service: ProveedorService;
    constructor(private app: Application){
        this.prov_service =  new ProveedorService();
        this.routes();
    }

    private routes(){
        
    }
}