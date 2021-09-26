import type { Password } from "../1.domain/shared-kernel";
import type { User } from "../1.domain/User";

import type { LoggedUser } from "./model/LoggedUser";

export type UnencryptedPassword = Password;
export type EncryptedPassword = Password;
export type AccessToken = string;

export interface AuthenticationService {
  encryptPassword(password: UnencryptedPassword): Promise<EncryptedPassword>;
  authenticateUser(
    unencryptedPassword: UnencryptedPassword,
    user: User
  ): Promise<boolean>;
  generateAccessToken(user: User): AccessToken;
  getUserByToken(token: AccessToken): Promise<LoggedUser>;
}
