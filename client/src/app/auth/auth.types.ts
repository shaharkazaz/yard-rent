export type Credentials = { email: string; password: string };
export type SignupParams = Credentials & { name: string; address: string };
export type LoginResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
};

export type UserRole = 'user' | 'admin';
export const USER_ROLES = {
  user: 0,
  admin: 1
};
