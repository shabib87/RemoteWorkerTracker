import {Breadcrumb} from './Breadcrumb';

export interface Worker {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  lastSeen: Date;
  breadcrumbs?: Breadcrumb[];
}
