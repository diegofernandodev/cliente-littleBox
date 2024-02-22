import { ObjectId } from 'mongodb';
export interface Rol{
    _id?: ObjectId;
    nombre: string;
    permisos: string[];
}