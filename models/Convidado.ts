import mongoose, { Schema, Document } from 'mongoose';

interface IConvidado extends Document {
  fullName: string;
  participants: number;
}

const ConvidadoSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    participants: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Convidado = mongoose.models.Convidado || mongoose.model<IConvidado>('convidado', ConvidadoSchema);

export default Convidado;
