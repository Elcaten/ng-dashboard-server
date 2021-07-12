import {Document, Model, model, Schema} from 'mongoose';
import {IComputer} from '../interfaces/computer';


export interface IComputerModel extends IComputer, Document {
}

export const ComputerSchema = new Schema({
    name: String,
    introduced: Date,
    discontinued: Number,
    company: String,
});

export const Computer: Model<IComputerModel> = model<IComputerModel>('Computer', ComputerSchema);
