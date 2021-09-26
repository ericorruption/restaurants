import type { CreateUser } from "./use-case/auth/CreateUser";

interface UseCases {
  createUser: CreateUser;
}

export class Application {
  useCases: UseCases;

  constructor(useCases: UseCases) {
    this.useCases = useCases;
  }
}
