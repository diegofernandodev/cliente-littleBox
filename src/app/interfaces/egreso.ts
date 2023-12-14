
import { ObjectId } from 'mongodb';
import { Categoria } from "../interfaces/categorias";
import { Tercero } from "../interfaces/terceros";;

export interface Egreso {
  _id?: ObjectId;
  egresoId?: number;
  tenantId?: string;
  tercero?: Tercero | null;      
  fecha: Date;
  detalle: string;
  categoria?: Categoria | null; 
  valor: number;
}

