import type { User, UserId } from "../../../1.domain/User";
import type { UserRepository } from "../../UserRepository";

export class MockUserRepository implements UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async findById(userId: UserId): Promise<User> {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error("User not found");
    }

    return Promise.resolve(user);
  }

  persist(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
}
