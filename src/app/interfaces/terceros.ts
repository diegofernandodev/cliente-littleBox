import { ObjectId } from 'mongodb';

export interface Tercero{
    _id?: ObjectId;
    tenantId: string;
    nombreTercero: string;
    documentoTercero: string;
    direccionTercero: string;
    telefonoTercero: string;
    emailTercero: string;
    
}