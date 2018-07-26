import { IEntity } from './entity';

export interface IProcess extends IEntity {
  status?: boolean;
  hasError?: boolean;
  lastStartDate?: Date;
  lastErrorDate?: Date;
  lastErrorText?: string;
}
