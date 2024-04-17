export interface IUser {
  _id: string;
  sub: string;
  role: string;
  username: string;
  password: string;
  email: string;
  displayName: string;
  refreshToken: string;
}
