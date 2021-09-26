import type { Email, Password } from "../../../1.domain/shared-kernel";
import { createUser, Role } from "../../../1.domain/User";
import type { UserRepository } from "../../UserRepository";
import type { UseCase } from "../UseCase";

export interface Input {
  email: Email;
  name?: string;
  password: Password;
  role?: Exclude<Role, "admin">;
}

export class CreateUser implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(input.email);

      if (user) {
        throw new Error("User for this email already exists");
      }
    } catch (e) {
      if (e instanceof Error && e.message === "User not found") {
        const newUser = createUser(input);

        // TODO validate email

        await this.userRepository.persist(newUser);
      } else {
        throw e;
      }
    }
  }
}
