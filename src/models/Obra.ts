import mongoose from "mongoose";
import { IProveedor } from "./Proveedor"

export interface IObra extends mongoose.Document{
    Nombre : string;
    Caracteristicas: string;
    FechaDeCreacion: string;
    Creador: string;
    Pais: string;
    Tipo: string;
    Estado: string;
    Proveedor: IProveedor;
 }
 
 const ObraSchema = new mongoose.Schema({
     Nombre : {type: String, required: true},
     Caracteristicas : {type: String, required: true},
     FechaDeCreacion : {type: String, required: true},
     Creador : {type: String, required: true},
     Pais : {type: String, required: true},
     Tipo : {type: String, required: true},
     Estado : {type: String, required: true},
     Proveedor : {type: mongoose.Schema.Types.ObjectId, ref: "Proveedor"}
 });
 
 export const Obra = mongoose.model<IObra>("Obra", ObraSchema);
 