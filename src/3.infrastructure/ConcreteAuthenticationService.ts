import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { User, UserId } from "../1.domain/User";
import type {
  AccessToken,
  AuthenticationService,
  EncryptedPassword,
  UnencryptedPassword,
} from "../2.application/AuthenticationService";
import type { LoggedUser } from "../2.application/model/LoggedUser";
import type { UserRepository } from "../2.application/UserRepository";

type DecodedAccessToken = { userId: UserId };

export class ConcreteAuthenticationService implements AuthenticationService {
  SALT_LENGTH = 10;

  constructor(
    private readonly secret: string,
    private readonly userRepository: UserRepository
  ) {}

  encryptPassword(password: UnencryptedPassword): Promise<EncryptedPassword> {
    return bcrypt.hash(password, this.SALT_LENGTH);
  }

  authenticateUser(
    unencryptedPassword: UnencryptedPassword,
    user: User
  ): Promise<boolean> {
    return bcrypt.compare(unencryptedPassword, user.password);
  }

  generateAccessToken(user: User): AccessToken {
    return jwt.sign(
      {
        userId: user.id,
      },
      this.secret,
      {
        expiresIn: "1h",
      }
    );
  }

  private decodeAccessToken(accessToken: AccessToken): DecodedAccessToken {
    const verifiedToken = jwt.verify(accessToken, this.secret);

    if (typeof verifiedToken !== "object") {
      throw new Error("Invalid access token");
    }

    return verifiedToken as DecodedAccessToken;
  }

  getUserByToken(token: string): Promise<LoggedUser> {
    const { userId } = this.decodeAccessToken(token);

    return this.userRepository.findById(userId);
  }
}
