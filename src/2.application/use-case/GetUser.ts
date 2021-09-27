import type { LoggedUser } from "../model/LoggedUser";

import type { UseCase } from "./UseCase";

interface Input {
  user?: LoggedUser;
}

export class GetUser implements UseCase {
  async execute(input: Input): Promise<LoggedUser | undefined> {
    if (input.user) {
      return Promise.resolve(input.user);
    }
  }
}
