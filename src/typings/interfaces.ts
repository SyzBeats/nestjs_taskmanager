// jwt interface

interface JwtPayload {
  username: string;
}

interface AccessToken {
  accessToken: string;
}

export { JwtPayload, AccessToken };
