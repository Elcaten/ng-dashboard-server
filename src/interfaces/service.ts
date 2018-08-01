import { IEntity } from './entity';

// TODO: вынести в общий с клиентом модуль
export interface IService extends IEntity {
  tags?: string[];
  status?: string;
  releaseVersion?: string;
}
