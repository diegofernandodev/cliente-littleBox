
import { ObjectId } from 'mongodb';
import { Categoria } from "../interfaces/categorias";
import { Tercero } from "../interfaces/terceros";
// import { Categoria } from "./categorias";

export interface Egreso {
  _id?: any;
  egresoId?: number;
  tenantId?: string;
  tercero: Tercero       //string | ObjectId; // Puedes mantenerlo como string o ObjectId según prefieras
  fecha: Date;
  detalle: string;
  categoria: Categoria   // string | ObjectId; // Puedes mantenerlo como string o ObjectId según prefieras
  valor: number;
}