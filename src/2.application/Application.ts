import type { CreateUser } from "./use-case/auth/CreateUser";
import type { LogIn } from "./use-case/auth/LogIn";

interface UseCases {
  createUser: CreateUser;
  logIn: LogIn;
}

export class Application {
  useCases: UseCases;

  constructor(useCases: UseCases) {
    this.useCases = useCases;
  }
}
