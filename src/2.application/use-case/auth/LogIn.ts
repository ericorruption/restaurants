import type { Email, Password } from "../../../1.domain/shared-kernel";
import type {
  AccessToken,
  AuthenticationService,
} from "../../AuthenticationService";
import type { UserRepository } from "../../UserRepository";
import type { UseCase } from "../UseCase";

interface Input {
  email: Email;
  password: Password;
}

export class LogIn implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authenticationService: AuthenticationService
  ) {}

  async execute(input: Input): Promise<AccessToken> {
    const user = await this.userRepository.findByEmail(input.email);

    const isPasswordValid = await this.authenticationService.authenticateUser(
      input.password,
      user
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return this.authenticationService.generateAccessToken(user);
  }
}
