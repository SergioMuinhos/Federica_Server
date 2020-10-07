import { model, Document, Schema } from "mongoose";


const tecnologiaSchema = new Schema({
  icono: {
    type: String,
    required: [true, "El icono es obligatorio"],
  },

  tecnologia: {
    type: String,
    required: [true, "El tecnologia es obligatorio"],
  },
  experiencia: {
    type: String,
    required: [true, "La experiencia es obligatorio"],
  }
});



interface ITecnologia extends Document {
  icono: String;
  tecnologia: String;
  experiencia: String;
 
}

export const Tecnologias = model<ITecnologia>("Tecnologias", tecnologiaSchema);
