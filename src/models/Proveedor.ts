import mongoose from "mongoose";
import { IDireccion } from "./Direccion"

export interface IProveedor extends mongoose.Document{
    RTN: string;
    Nombre: String;
    Telefono: number;
    Direccion: IDireccion;
 }
 
 const ProveedorSchema = new mongoose.Schema({
     RTN: {type: String, required: true},
     Nombre: {type: String, required: true},
     Telefono: {type: Number, required: true},
     Direccion: {type: mongoose.Schema.Types.ObjectId, ref: "Direccion"}
 });
 
 export const Proveedor = mongoose.model<IProveedor>("Proveedor", ProveedorSchema);
 