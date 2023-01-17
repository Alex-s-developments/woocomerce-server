import { ITimestamps } from 'src/shared/interfaces/Timestamps';

export interface IProduct extends ITimestamps {
  id: number;
  name: string;
}
