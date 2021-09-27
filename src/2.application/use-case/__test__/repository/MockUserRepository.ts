import type { Email } from "../../../../1.domain/shared-kernel";
import type { User, UserId } from "../../../../1.domain/User";
import type { UserRepository } from "../../../repository/UserRepository";

export class MockUserRepository implements UserRepository {
  private users: User[];

  constructor(initialState: User[] = []) {
    this.users = initialState;
  }

  async findById(userId: UserId): Promise<User> {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }

    return Promise.resolve(user);
  }

  findByEmail(email: Email): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new Error("User not found");
    } else {
      return Promise.resolve(user);
    }
  }

  persist(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}
