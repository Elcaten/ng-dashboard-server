import { IEntity } from './entity';

// TODO: вынести в общий с клиентом модуль
export interface IHost extends IEntity {
  status?: string;
  ram?: number;
  cpu?: number;
  disk?: number;
}
