import { PrismaClient } from "@prisma/client";

import { Application } from "../../2.application/Application";
import { CreateUser } from "../../2.application/use-case/auth/CreateUser";
import { LogIn } from "../../2.application/use-case/auth/LogIn";
import { ConcreteAuthenticationService } from "../ConcreteAuthenticationService";
import { PrismaUserRepository } from "../PrismaUserRepository";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const prismaClient = new PrismaClient();
const authenticationServiceImplementation = new ConcreteAuthenticationService(
  JWT_SECRET
);
const userRepositoryImplementation = new PrismaUserRepository(
  prismaClient,
  authenticationServiceImplementation
);

export const application = new Application({
  createUser: new CreateUser(userRepositoryImplementation),
  logIn: new LogIn(
    userRepositoryImplementation,
    authenticationServiceImplementation
  ),
});
