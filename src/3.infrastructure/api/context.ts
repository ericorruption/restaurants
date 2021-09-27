import { AuthenticationError } from "apollo-server";
import type { ContextFunction } from "apollo-server-core";
import type { ExpressContext } from "apollo-server-express";
import {
  NotBeforeError,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";

import type { Application } from "../../2.application/Application";
import type { LoggedUser } from "../../2.application/model/LoggedUser";

import { application } from "./bootstrap";

export interface Context {
  app: Application;
  user?: LoggedUser;
}

export const context: ContextFunction<ExpressContext> = async ({
  req,
}): Promise<Context> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return { app: application };
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const user = await application.authenticationService.getUserByToken(token);

    return {
      app: application,
      user,
    };
  } catch (e) {
    // TODO these error types should come from the abstract authentication service
    if (e instanceof TokenExpiredError) {
      throw new AuthenticationError("Token expired");
    } else if (e instanceof JsonWebTokenError || e instanceof NotBeforeError) {
      return { app: application };
    } else {
      throw e;
    }
  }
};
