import { PrismaClient } from "@prisma/client";

import { Application } from "../../2.application/Application";
import { AuthorizationService } from "../../2.application/AuthorizationService";
import { CreateUser } from "../../2.application/use-case/auth/CreateUser";
import { LogIn } from "../../2.application/use-case/auth/LogIn";
import { CreateRestaurant } from "../../2.application/use-case/restaurant/CreateRestaurant";
import { ListRestaurants } from "../../2.application/use-case/restaurant/ListRestaurants";
import { ReviewRestaurant } from "../../2.application/use-case/restaurant/ReviewRestaurant";
import { ConcreteAuthenticationService } from "../ConcreteAuthenticationService";
import { PrismaRestaurantRepository } from "../repository/PrismaRestaurantRepository";
import { PrismaUserRepository } from "../repository/PrismaUserRepository";
import { PrismaReviewRepository } from "../repository/PrismaReviewRepository";
import { ReplyToReview } from "../../2.application/use-case/ReplyToReview";
import { PrismaReplyRepository } from "../repository/PrismaReplyRepository";
import { GetRestaurant } from "../../2.application/use-case/restaurant/GetRestaurant";
import { GetUser } from "../../2.application/use-case/GetUser";
import { ListOwnerRestaurants } from "../../2.application/use-case/restaurant/ListOwnerRestaurants";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const prismaClient = new PrismaClient();
const userRepositoryImplementation = new PrismaUserRepository(prismaClient);
const authenticationServiceImplementation = new ConcreteAuthenticationService(
  JWT_SECRET,
  userRepositoryImplementation
);

const authorizationService = new AuthorizationService();

const restaurantRepositoryImplementation = new PrismaRestaurantRepository(
  prismaClient
);

const reviewRepositoryImplementation = new PrismaReviewRepository(prismaClient);
const replyRepositoryImplementation = new PrismaReplyRepository(prismaClient);

export const application = new Application(
  {
    createUser: new CreateUser(
      userRepositoryImplementation,
      authenticationServiceImplementation
    ),
    logIn: new LogIn(
      userRepositoryImplementation,
      authenticationServiceImplementation
    ),
    listRestaurants: new ListRestaurants(
      restaurantRepositoryImplementation,
      authorizationService
    ),
    createRestaurant: new CreateRestaurant(
      restaurantRepositoryImplementation,
      authorizationService
    ),
    reviewRestaurant: new ReviewRestaurant(
      reviewRepositoryImplementation,
      authorizationService
    ),
    replyToReview: new ReplyToReview(
      reviewRepositoryImplementation,
      replyRepositoryImplementation,
      authorizationService
    ),
    getRestaurant: new GetRestaurant(restaurantRepositoryImplementation),
    getUser: new GetUser(),
    listOwnerRestaurants: new ListOwnerRestaurants(
      restaurantRepositoryImplementation
    ),
  },
  authenticationServiceImplementation
);
