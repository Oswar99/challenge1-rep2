import {Request, Response} from "express";
import { Direccion, IDireccion } from "../models/direccion.model";
import { Proveedor, IProveedor } from "../models/proveedor.model"

import { MongooseDocument } from "mongoose";
import { resolve } from "dns";

class DireccionHelpers{

    GetDireccion(id: string): Promise<IDireccion>{
        return new Promise<IDireccion>((resolve) =>{
            Direccion.findById(id,(err: Error, direccion: IDireccion)=>{
                if(err){
                    console.log(err);
                }
                resolve(direccion);
            });
        });
    }

    NumberOfProveedorByDireccion(dir: IDireccion):Promise<number>{
        console.log(dir._id);
        return new Promise<number>( resolve => {
            Proveedor.aggregate([
                { "$match": { "Direccion": dir._id }}
            ],(err: Error, data: any)=>{
                resolve(data.length);
            })
        });
    }

}

export class DireccionService extends DireccionHelpers{
    public getAll(req: Request, res: Response){
        Direccion.find({},(err: Error, direcciones: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(direcciones);
        });
    }

    public async getById(req: Request, res: Response){
        const my_dir = await super.GetDireccion(req.params.id);
        res.status(200).send(my_dir);
    }

     //Payload
    public Update(req: Request, res: Response){
        console.log("Se ha llamado el metodo Update")
        Direccion.findByIdAndUpdate(req.params.id, req.body, (err: Error, direccion:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( direccion? {"updated": true} : {"updated": false});
        });
    }

    public async Delete(req: Request, res: Response){
        
        const Dir = await super.GetDireccion(req.params.id);
        const nProv: number = Dir? await super.NumberOfProveedorByDireccion(Dir) : 0;
        
        if(nProv > 0){
            res.status(200).json({"deleted": false, "message": `la direccion ${req.params.id} tiene ${nProv} Proveedores asociados}`});
        }else{
            if(Dir == undefined){
                res.status(200).json({"deleted": false, "message": `la direccion ${req.params.id} No existe`});
            }else{
                Direccion.findByIdAndDelete(req.params.id, req.body,(err:Error, direccion: any)=>{
                    if(err){
                        res.status(401).send(err);
                    }
                    res.status(200).json( direccion? {"deleted": true, "message": "Sin Error"}: {"deleted": false, "message": "Ocurrio un Error"});
                })
            }
        }
    }

    public New(req: Request, res: Response){
        const p = new Direccion(req.body);
        p.save((err : Error, direccion : IDireccion)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( direccion? {"successed": true, "Direccion": direccion} : {"successed": false});
        });
    }
}