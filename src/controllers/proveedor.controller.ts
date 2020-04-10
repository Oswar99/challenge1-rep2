import {Application} from "express";
import {ProveedorService} from "../services/proveedor.service";

export class ProveedorController{
    private prov_service: ProveedorService;
    constructor(private app: Application){
        this.prov_service =  new ProveedorService();
        this.routes();
    }

    private routes(){
        this.app.route("/proveedores").get(this.prov_service.getAll);
        
        this.app.route("/proveedor").post(this.prov_service.New);

        this.app.route("/proveedor/:id")
        .get(this.prov_service.getById)
        .put(this.prov_service.Update)
        .delete(this.prov_service.Delete);
    }
}