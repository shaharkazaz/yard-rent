import { Product } from '../../marketplace/marketplace.types';
import { UserInfo } from '../../auth/state/auth.model';

export type MessageType =
  | 'orderIsAboutToExpire24H'
  | 'productReturned'
  | 'orderIsAboutToExpire48H';

export interface ServerMessage {
  date: string;
  isOpened: boolean;
  isArchived: boolean;
  productToReturn: Product;
  productOwner: UserInfo;
  productRenter: UserInfo;
  type: MessageType;
  _id: string;
  order: any;
}

export interface ClientMessage extends ServerMessage {}
