export type LoginParams = { email: string; password: string };
export type SignupParams = LoginParams & { name: string; address: string };
export type LoginResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
};
