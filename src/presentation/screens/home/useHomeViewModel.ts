import {useCallback, useEffect} from 'react';
import {Worker} from '../../../domain/entities/Worker';
import useWorkerStore from '../../../shared/stores/useWorkerStore';
import {WorkerViewData} from './WorkerViewData';
import {useGetWorkersUseCase} from '../../../domain/usecases/useGetWorkersUseCase';

function mapWorkerToViewData(worker: Worker): WorkerViewData {
  return {
    id: worker.id,
    name: worker.name,
    location: worker.location,
  };
}

function useHomeViewModel() {
  const storedWorkers = useWorkerStore(state => state.workers);
  const setWorkers = useWorkerStore(state => state.setWorkers);
  const {fetchWorkers} = useGetWorkersUseCase();

  const loadWorkers = useCallback(async () => {
    try {
      const fetchedWorkers = await fetchWorkers();
      const viewData = fetchedWorkers.map(mapWorkerToViewData);
      console.log('viewData', viewData);
      setWorkers(viewData);
    } catch (error) {
      console.error('Failed to load workers:', error);
    }
  }, [fetchWorkers, setWorkers]);

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  function getWorkerViewData(): WorkerViewData[] {
    return storedWorkers;
  }

  return {
    getWorkerViewData,
  };
}

export default useHomeViewModel;
