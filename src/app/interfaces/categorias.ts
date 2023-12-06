import { ObjectId } from 'mongodb';

export interface Categoria {
  _id: ObjectId;
  nombre: string;
}
