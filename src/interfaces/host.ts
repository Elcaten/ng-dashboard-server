import { IEntity } from './entity';

export interface IHost extends IEntity {
  status?: string;
  ram?: number;
  cpu?: number;
  disk?: number;
}
