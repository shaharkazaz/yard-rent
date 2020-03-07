import { ID } from '@datorama/akita';

export type Creds = {
  email: string;
  password: string;
};

export type User = {
  id: ID;
  name: string;
  token: string;
};

export function createEmptyUser() {
  return {
    id: null,
    name: '',
    token: ''
  } as User;
}
