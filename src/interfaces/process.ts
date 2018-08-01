import { IEntity } from './entity';

// TODO: вынести в общий с клиентом модуль
export interface IProcess extends IEntity {
  status?: boolean;
  hasError?: boolean;
  lastStartDate?: Date;
  lastErrorDate?: Date;
  lastErrorText?: string;
}
