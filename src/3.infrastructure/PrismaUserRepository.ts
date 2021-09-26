import type { PrismaClient, Role } from "@prisma/client";

import type { User } from "../1.domain/User";
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

  async persist(user: User): Promise<void> {
    const password = await this.encryptionService.encrypt(user.password);
    await this.prisma.user.create({
      data: { ...user, password, role: user.role.toUpperCase() as Role },
    });
  }
}
