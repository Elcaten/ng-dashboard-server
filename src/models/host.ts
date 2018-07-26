import { Document, Model, model, Schema } from 'mongoose';

import { IHost } from '../interfaces/host';

export interface IHostModel extends IHost, Document {
}

export const HostSchema = new Schema({
  name: String,
  status: String,
  ram: Number,
  cpu: Number,
  disk: Number
});

export const Host: Model<IHostModel> = model<IHostModel>('Host', HostSchema);
