import { PrismaClient } from "@prisma/client";

import { Application } from "../../2.application/Application";
import { CreateUser } from "../../2.application/use-case/auth/CreateUser";
import { BcryptEncryptionService } from "../BcryptEncryptionService";
import { PrismaUserRepository } from "../PrismaUserRepository";

const prismaClient = new PrismaClient();
const encryptionServiceImpl = new BcryptEncryptionService();
const userRepositoryImpl = new PrismaUserRepository(
  prismaClient,
  encryptionServiceImpl
);

export const application = new Application({
  createUser: new CreateUser(userRepositoryImpl),
});
