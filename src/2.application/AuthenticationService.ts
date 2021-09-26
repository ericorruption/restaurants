import type { Password } from "../1.domain/shared-kernel";
import type { Role, User, UserId } from "../1.domain/User";

export type UnencryptedPassword = Password;
export type EncryptedPassword = Password;
export type AccessToken = string;
export interface DecodedAccessToken {
  userId: UserId;
  role: Role;
}

export interface AuthenticationService {
  encryptPassword(password: UnencryptedPassword): Promise<EncryptedPassword>;
  authenticateUser(
    unencryptedPassword: UnencryptedPassword,
    user: User
  ): Promise<boolean>;
  generateAccessToken(user: User): AccessToken;
  decodeAccessToken(accessToken: AccessToken): DecodedAccessToken;
}
