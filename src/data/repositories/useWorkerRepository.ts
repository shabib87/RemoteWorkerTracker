import {useCallback} from 'react';
import {Worker} from '../../domain/entities/Worker';
import workerApiDataSource from '../datasources/WorkerApiDataSource';
import {WorkerDTO} from '../models/WorkerDTO';

const mapDTOToEntity = (dto: WorkerDTO): Worker => ({
  id: dto.id,
  name: dto.name,
  location: dto.location,
  lastSeen: new Date(),
});

export const useWorkerRepository = () => {
  const getWorkers = useCallback(async (): Promise<Worker[]> => {
    const dtos = await workerApiDataSource.fetchWorkers();
    return dtos.map(mapDTOToEntity);
  }, []);

  return {
    getWorkers,
  };
};
