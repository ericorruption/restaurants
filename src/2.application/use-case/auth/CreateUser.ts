import { createUser, Role } from "../../../1.domain/User";
import type { UserRepository } from "../../UserRepository";
import type { UseCase } from "../UseCase";

export interface Input {
  email: string;
  name?: string;
  password: string;
  role?: Exclude<Role, "admin">;
}

export class CreateUser implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Input): Promise<void> {
    const newUser = createUser(input);

    // TODO validate uniqueness of email

    await this.userRepository.persist(newUser);
  }
}
