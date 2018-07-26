import { IEntity } from './entity';

export interface IService extends IEntity {
  tags?: string[];
  status?: string;
  releaseVersion?: string;
}
