import { ID } from '@datorama/akita';

export type Creds = {
  email: string;
  password: string;
};

export type User = {
  id: ID;
  name: string;
  image: string;
  token: string;
  user: any;
  rewards: number;
};

export function createEmptyUser() {
  return {
    id: null,
    name: '',
    token: '',
    user: {}
  } as User;
}
