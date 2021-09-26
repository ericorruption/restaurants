import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import type { User } from "../1.domain/User";
import type {
  AccessToken,
  AuthenticationService,
  DecodedAccessToken,
  EncryptedPassword,
  UnencryptedPassword,
} from "../2.application/AuthenticationService";

export class ConcreteAuthenticationService implements AuthenticationService {
  SALT_LENGTH = 10;

  constructor(private readonly secret: string) {}

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
        // roles: [user.role],
      },
      this.secret,
      {
        expiresIn: "1h",
      }
    );
  }

  decodeAccessToken(accessToken: AccessToken): DecodedAccessToken {
    const verifiedToken = jwt.verify(accessToken, this.secret);

    if (typeof verifiedToken !== "object") {
      throw new Error("Invalid access token");
    }

    return verifiedToken as DecodedAccessToken;
  }
}
