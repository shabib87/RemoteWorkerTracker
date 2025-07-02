import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {WorkerViewData} from '../../presentation/screens/home/WorkerViewData';

interface WorkerState {
  workers: WorkerViewData[];
  selectedWorker: WorkerViewData | null;
  setWorkers: (workers: WorkerViewData[]) => void;
  setWorker: (updatedWorker: WorkerViewData) => void;
  selectWorker: (workerId: string) => void;
  clearSelectedWorker: () => void;
}

const useWorkerStore = create<WorkerState>()(
  immer(set => ({
    workers: [],
    selectedWorker: null,
    setWorkers: workers =>
      set(state => {
        state.workers = workers;
      }),
    setWorker: updatedWorker =>
      set(state => {
        const index = state.workers.findIndex(
          (w: WorkerViewData) => w.id === updatedWorker.id,
        );
        if (index !== -1) {
          state.workers[index] = updatedWorker;
        }
      }),
    selectWorker: workerId =>
      set(state => {
        const worker =
          state.workers.find((w: WorkerViewData) => w.id === workerId) || null;
        state.selectedWorker = worker;
      }),
    clearSelectedWorker: () =>
      set(state => {
        state.selectedWorker = null;
      }),
  })),
);

export default useWorkerStore;
