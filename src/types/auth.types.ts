export interface LoginDto {
  usernameOrEmail: string;
  password: string;
}

export interface SignupDto {
  username: string;
  password: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
}

export interface JwtDto {
  iss: string;
  aud: string;
  iat: number;
  nbf: number;
  exp: number;
  jti: string;
  email: string;
  username: string;
  uuid: string;
}
