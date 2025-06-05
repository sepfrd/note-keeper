export interface LoginData {
token: string;
user: {
id: string;
name: string;
email: string;
};
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
