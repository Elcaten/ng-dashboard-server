import faker from 'faker';

import { IEntity } from './interfaces/entity';
import { IHost } from './interfaces/host';
import { IProcess } from './interfaces/process';
import { IService } from './interfaces/service';

const generateEntityArray = (entityGenerator: () => IEntity): IEntity[] => {
  const entities = [];
  for (let i = 0; i < faker.random.number({ min: 10, max: 15 }); i++) {
    entities.push(entityGenerator());
  }
  return entities;
};

const generateHost = (): IHost =>
  ({
    name: faker.internet.ip(),
    status: faker.random.boolean() ? 'online' : 'offline',
    cpu: faker.random.number({ min: 0, max: 100 }),
    disk: faker.random.number({ min: 0, max: 100 }),
    ram: faker.random.number({ min: 0, max: 100 }),
  });

const generateProcess = (): IProcess => ({
  name: faker.system.commonFileName('exe', ''),
  status: faker.random.boolean(),
  hasError: faker.random.boolean(),
  lastStartDate: faker.date.recent(10),
  lastErrorDate: faker.date.recent(10),
  lastErrorText: faker.random.boolean() ? faker.hacker.phrase() : ''
});

const generateService = (): IService => ({
  name: `${faker.hacker.verb()}_${faker.hacker.noun()}`,
  status: faker.random.arrayElement(['starting', 'running', 'stopping', 'stopped']),
  releaseVersion: faker.system.semver(),
  tags: faker.random.words().split(' ')
});

export const generateData = () => ({
  hosts: generateEntityArray(generateHost),
  processes: generateEntityArray(generateProcess),
  services: generateEntityArray(generateService)
});
