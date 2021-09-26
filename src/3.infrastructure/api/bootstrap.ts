import { PrismaClient } from "@prisma/client";

import { Application } from "../../2.application/Application";
import { AuthorizationService } from "../../2.application/AuthorizationService";
import { CreateUser } from "../../2.application/use-case/auth/CreateUser";
import { LogIn } from "../../2.application/use-case/auth/LogIn";
import { ListRestaurants } from "../../2.application/use-case/ListRestaurants";
import { ConcreteAuthenticationService } from "../ConcreteAuthenticationService";
import { PrismaRestaurantRepository } from "../PrismaRestaurantRepository";
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

const authorizationService = new AuthorizationService();

const restaurantRepositoryImplementation = new PrismaRestaurantRepository(
  prismaClient
);

export const application = new Application(
  {
    createUser: new CreateUser(userRepositoryImplementation),
    logIn: new LogIn(
      userRepositoryImplementation,
      authenticationServiceImplementation
    ),
    listRestaurants: new ListRestaurants(
      restaurantRepositoryImplementation,
      authorizationService
    ),
  },
  authenticationServiceImplementation
);
