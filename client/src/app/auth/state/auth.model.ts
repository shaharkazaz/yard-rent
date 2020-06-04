import { ID } from '@datorama/akita';
import {UserRole} from "../auth.types";

export type Creds = {
  email: string;
  password: string;
};

export type UserInfo = {
  address: string;
  email: string;
  isDeleted: boolean;
  name: string;
  orderId: string[];
  password: string[];
  product: string[];
  favorites: string[];
  rewards: number;
  role: UserRole;
  image: string;
  phone: string;
  _id: string;
}

export type User = {
  id: ID;
  name: string;
  token: string;
  user: UserInfo;
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
