export interface WorkerDTO {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}
