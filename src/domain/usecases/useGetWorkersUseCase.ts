import {useCallback} from 'react';
import {useWorkerRepository} from '../../data/repositories/useWorkerRepository';
import {Worker} from '../entities/Worker';

export const useGetWorkersUseCase = () => {
  const {getWorkers} = useWorkerRepository();

  const fetchWorkers = useCallback(async (): Promise<Worker[]> => {
    return await getWorkers();
  }, [getWorkers]);

  return {
    fetchWorkers,
  };
};
