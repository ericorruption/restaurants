import type { ExpressContext } from "apollo-server-express";
import {
  NotBeforeError,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";

import type { Application } from "../../2.application/Application";

import { application } from "./bootstrap";

export interface Context {
  app: Application;
  userId?: string;
}

export const context = ({ req }: ExpressContext): Context => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { app: application };
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken =
      application.authenticationService.decodeAccessToken(token);

    return {
      app: application,
      userId: decodedToken?.userId,
    };
  } catch (e) {
    // TODO these error types should come from the abstract authentication service
    if (
      e instanceof JsonWebTokenError ||
      e instanceof TokenExpiredError ||
      e instanceof NotBeforeError
    ) {
      return { app: application };
    } else {
      throw e;
    }
  }
};
