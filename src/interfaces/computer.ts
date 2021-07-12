import {IEntity} from './entity';

// TODO: вынести в общий с клиентом модуль
export interface IComputer extends IEntity {
    name: string,
    introduced: Date,
    discontinued: number,
    company: string,
}
