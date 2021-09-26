import type { Password } from "../../../1.domain/shared-kernel";
import type { User } from "../../../1.domain/User";
import type { AuthenticationService } from "../../AuthenticationService";

export class MockAuthenticationService implements AuthenticationService {
  authenticateUser(password: Password, user: User): Promise<boolean> {
    return Promise.resolve(password === user.password);
  }
  encryptPassword(input: Password): Promise<string> {
    return Promise.resolve(input);
  }
  generateAccessToken(): string {
    return "mock";
  }
  getUserByToken(token: string): Promise<User> {
    throw new Error("Function not implemented.");
  }
}
