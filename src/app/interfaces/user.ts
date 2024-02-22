import { Empresa } from "../interfaces/empresa";
import { Rol } from "../interfaces/rol";
import { ObjectId } from 'mongodb';

export interface User{
    _id?: ObjectId;
  username: string;
  password: string;
  email: string;
  empresaUser: Empresa; 
  estado: 'activo' | 'inactivo';
  rol: Rol; 
  name: string;
  imagenFirma: string;
  tenantId: string;
}