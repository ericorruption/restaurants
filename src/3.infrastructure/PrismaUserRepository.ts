import type { PrismaClient, Role as DbRole } from "@prisma/client";

import type { Email } from "../1.domain/shared-kernel";
import type { Role, User } from "../1.domain/User";
import type { EncryptionService } from "../2.application/EncryptionService";
import type { UserRepository } from "../2.application/UserRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly encryptionService: EncryptionService
  ) {}
  findById(userId: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: Email): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      ...user,
      name: user.name ?? undefined,
      role: user.role.toLowerCase() as Role,
    };
  }

  async persist(user: User): Promise<void> {
    const password = await this.encryptionService.encrypt(user.password);
    await this.prisma.user.create({
      data: { ...user, password, role: user.role.toUpperCase() as DbRole },
    });
  }
}
