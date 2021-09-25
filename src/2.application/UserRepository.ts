import type { UserId, User } from "../1.domain/User";

export interface UserRepository {
  findById(userId: UserId): Promise<User>;
  persist(user: User): Promise<void>;
}
