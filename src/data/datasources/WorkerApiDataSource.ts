import {WorkerDTO} from '../models/WorkerDTO';
import {mockWorkers} from './mockdata/mockWorkers';

const workerApiDataSource = {
  fetchWorkers: async (): Promise<WorkerDTO[]> => mockWorkers,
};

export default workerApiDataSource;
