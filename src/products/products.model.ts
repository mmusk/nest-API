import * as mongoose from 'mongoose';

export const ProductScehema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});
export interface Products extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
