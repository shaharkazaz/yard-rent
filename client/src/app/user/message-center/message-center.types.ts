import { UserInfo } from '../../auth/state/auth.model';

export type MessageType =
  | 'orderIsAboutToExpire24H'
  | 'productReturned'
  | 'orderIsAboutToExpire48H';

export interface ServerMessage {
  date: string;
  isOpened: boolean;
  isArchived: boolean;
  productToReturn: {
    name: string;
    _id: string;
  };
  productOwner: UserInfo;
  productRenter: UserInfo;
  type: MessageType;
  _id: string;
  order: any;
}

export interface ClientMessage extends ServerMessage {}
