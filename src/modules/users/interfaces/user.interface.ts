import { ITimestamps } from 'src/shared/interfaces/Timestamps';

export class IUser extends ITimestamps {
  id: number;
  username: string;
  password: string;
}
