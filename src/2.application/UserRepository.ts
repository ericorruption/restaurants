import type { Email } from "../1.domain/shared-kernel";
import type { UserId, User } from "../1.domain/User";

export interface UserRepository {
  findById(userId: UserId): Promise<User>;
  findByEmail(email: Email): Promise<User>;
  persist(user: User): Promise<void>;
}
