export type JwtPayload = {
  _id: string;
  username: string;
  email: string;
  fullname: string;
  token: string;
};
export type JwtPayloadWithRefreshToken = JwtPayload & {
  refreshToken: string;
};
