import { Document, Model, model, Schema } from 'mongoose';
import { IProcess } from '../interfaces/process';

export interface IProcessModel extends IProcess, Document {
}

export const ProcessSchema = new Schema({
  name: String,
  status: Boolean,
  hasError: Boolean,
  lastStartDate: Date,
  lastErrorDate: Date,
  lastErrorText: String
});

export const Process: Model<IProcessModel> = model<IProcessModel>('Process', ProcessSchema);
