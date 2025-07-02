import {WorkerDTO} from '../../models/WorkerDTO';

export const mockWorkers: WorkerDTO[] = [
  {
    id: '1',
    name: 'Alice Patel',
    location: {
      latitude: 43.6426, // CN Tower area
      longitude: -79.3871,
    },
  },
  {
    id: '2',
    name: 'Brian Chen',
    location: {
      latitude: 43.6532, // Yonge-Dundas Square
      longitude: -79.3832,
    },
  },
  {
    id: '3',
    name: 'Carmen Lopez',
    location: {
      latitude: 43.651, // Trinity Bellwoods Park
      longitude: -79.4145,
    },
  },
  {
    id: '4',
    name: 'David Singh',
    location: {
      latitude: 43.7767, // North York Centre
      longitude: -79.4144,
    },
  },
  {
    id: '5',
    name: 'Ella Kim',
    location: {
      latitude: 43.6205, // Humber Bay Park
      longitude: -79.4781,
    },
  },
];
