import { model, Document, Schema } from "mongoose";


const imagenesYoSchema = new Schema({
  img: {
    type: String,
    unique:true
  }
});


interface IImagenesYo extends Document {
  img: string; 
}

export const ImagenesYo = model<IImagenesYo>("ImagenesYo", imagenesYoSchema);
