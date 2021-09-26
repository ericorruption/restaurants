import type {
  PrismaClient,
  Role as DbRole,
  User as DbUser,
} from "@prisma/client";

import type { Email } from "../1.domain/shared-kernel";
import type { Role, User } from "../1.domain/User";
import type { UserRepository } from "../2.application/UserRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async findById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return this.toDomainUser(user);
  }

  async findByEmail(email: Email): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return this.toDomainUser(user);
  }

  async persist(user: User): Promise<void> {
    await this.prisma.user.create({
      data: { ...user, role: user.role.toUpperCase() as DbRole },
    });
  }

  private toDomainUser(input: DbUser): User {
    return {
      ...input,
      name: input.name ?? undefined,
      role: input.role.toLowerCase() as Role,
    };
  }
}
