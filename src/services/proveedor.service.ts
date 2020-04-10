import {Request, Response} from "express";
import {Proveedor, IProveedor} from "../models/proveedor.model"
import {Obra} from "../models/obra.model"
import {MongooseDocument } from "mongoose";



class ProveedorHelpers{

    GetDireccion(id: string): Promise<IProveedor>{
        return new Promise<IProveedor>((resolve) =>{
            Proveedor.findById(id,(err: Error, direccion: IProveedor)=>{
                if(err){
                    console.log(err);
                }
                resolve(direccion);
            });
        });
    }

    NumberOfProveedorByDireccion(pro: IProveedor):Promise<number>{
        console.log(pro._id);
        return new Promise<number>( resolve => {
            Obra.aggregate([
                { "$match": { "Proveedor": pro._id }}
            ],(err: Error, data: any)=>{
                resolve(data.length);
            })
        });
    }

}

export class ProveedorService extends ProveedorHelpers{
    public getAll(req: Request, res: Response){
        Proveedor.find({},(err: Error, proveedores: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(proveedores);
        });
    }

    public async getById(req: Request, res: Response){
        const my_dir = await super.GetDireccion(req.params.id);
        res.status(200).send(my_dir);
    }

     //Payload
    public Update(req: Request, res: Response){
        console.log("Se ha llamado el metodo Update")
        Proveedor.findByIdAndUpdate(req.params.id, req.body, (err: Error, proveedor:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( proveedor? {"updated": true} : {"updated": false});
        });
    }

    public async Delete(req: Request, res: Response){
        
        const Dir = await super.GetDireccion(req.params.id);
        const nProv: number = Dir? await super.NumberOfProveedorByDireccion(Dir) : 0;
        
        if(nProv > 0){
            res.status(200).json({"deleted": false, "message": `El Proveedor ${req.params.id} tiene ${nProv} Obras asociados}`});
        }else{
            if(Dir == undefined){
                res.status(200).json({"deleted": false, "message": `El Proveedor ${req.params.id} No existe`});
            }else{
                Proveedor.findByIdAndDelete(req.params.id, req.body,(err:Error, direccion: any)=>{
                    if(err){
                        res.status(401).send(err);
                    }
                    res.status(200).json( direccion? {"deleted": true, "message": "Sin Error"}: {"deleted": false, "message": "Ocurrio un Error"});
                })
            }
        }
    }

    public New(req: Request, res: Response){
        const p = new Proveedor(req.body);
        p.save((err : Error, proveedor : IProveedor)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( proveedor? {"successed": true, "Proveedor": proveedor} : {"successed": false});
        });
    }
}