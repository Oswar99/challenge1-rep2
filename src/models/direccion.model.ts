import mongoose from "mongoose";

export interface IDireccion extends mongoose.Document{
    Avenida : string;
    Ciudad : string;
    Departamento : string;
    CodigoPostal : number;
    Pais : String
}

const DireccionSchema = new mongoose.Schema({
    Avenida : {type: String, required: true},
    Ciudad : {type: String, required: true},
    Departamento : {type: String, required: true},
    CodigoPostal : {type: Number, required: true},
    Pais : {type: String, required: true}
});

export const Direccion = mongoose.model<IDireccion>("Direccion", DireccionSchema);
