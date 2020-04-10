import {Request, Response} from "express";
import { Obra, IObra } from "../models/obra.model";
import { Mongoose, MongooseDocument } from "mongoose";

export class ObraService{

    public getAll(req: Request, res: Response){
        Obra.find({},(err: Error, obras: MongooseDocument)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(obras);
        });
    }
    public getById(req: Request, res: Response){
        Obra.findById(req.params.id, (err: Error, obra: IObra)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json(obra? obra : {} );
        });
    }

    public Update(req: Request, res: Response){
        console.log("Se ha llamado el metodo Update")
        Obra.findByIdAndUpdate(req.params.id, req.body, (err: Error, obra:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( obra? {"updated": true} : {"updated": false});
        });
    }

    public Delete(req: Request, res: Response){
        Obra.findByIdAndDelete(req.params.id, req.body, (err: Error, obra:any)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( obra? {"deleted": true} : {"deleted": false});
        });
    }

    public New(req: Request, res: Response){
        const p = new Obra(req.body);
        p.save((err : Error, obra : IObra)=>{
            if(err){
                res.status(401).send(err);
            }
            res.status(200).json( obra? {"successed": true, "Obra": obra} : {"successed": false});
        });
    }

}