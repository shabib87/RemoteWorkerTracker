import {Worker} from '../entities/Worker';

export interface WorkerRepository {
  getWorkers(): Promise<Worker[]>;
  getWorkerDetails(id: string): Promise<Worker>;
}
