export interface LoginData {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
