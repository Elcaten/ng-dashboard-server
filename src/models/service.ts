import { Document, Model, model, Schema } from 'mongoose';
import { IService } from '../interfaces/service';

export interface IServiceModel extends IService, Document {
}

export const ServiceSchema = new Schema({
  name: String,
  tags: [String],
  status: String,
  releaseVersion: String
});

export const Service: Model<IServiceModel> = model<IServiceModel>('Service', ServiceSchema);
