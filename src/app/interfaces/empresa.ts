import { ObjectId } from 'mongodb';
export interface Empresa{
    _id?: ObjectId;
  tenantId: string;
  nombreEmpresa: string;
  direccionEmpresa: string;
  telefonoEmpresa: string;
  emailEmpresa: string;
}