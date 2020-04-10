import express,{Application} from "express";

import {MainController} from "./controllers/main.controller";
import {ObraController} from "./controllers/obra.controller";
import {ProveedorController} from "./controllers/proveedor.controller";
import {DireccionController} from "./controllers/direccion.controller";

import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import {config} from "dotenv";
import {resolve} from "path"; 

config({path: resolve(__dirname, "../.env")});

class App{
    public app: Application;
    public mainController: MainController;
    public direccionController: DireccionController;
    public proveedorController: ProveedorController;
    public obraController: ObraController;

    constructor(){
        this.app = express();
        this.setConfig();
        this.setMongoConfig();
        
        this.mainController = new MainController(this.app);
        this.direccionController = new DireccionController(this.app);
        this.proveedorController = new ProveedorController(this.app);
        this.obraController = new ObraController(this.app);
    }
    private setConfig(){
        this.app.use(bodyParser.json({limit:"50mb"}));
        this.app.use(bodyParser.urlencoded({limit:"50mb", extended:true}));
        this.app.use(cors());
    }
    private setMongoConfig(){
        mongoose.Promise = global.Promise;

        mongoose.connect(process.env.MNG_URL!, { useNewUrlParser:true, useUnifiedTopology: true }, (err: any) =>{
            if(err){
                console.log(err.message);
            }else{
                console.log("Conexion Exitosa");
            }
        }); 
    }

}

export default new App().app;