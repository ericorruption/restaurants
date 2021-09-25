import { v4 as uuid } from "uuid";

import type { Email, Id, Password } from "./shared-kernel";

export type UserId = Id;
export type Role = "user" | "owner" | "admin";

export interface User {
  id: UserId;
  role: Role;
  name?: string;
  email: Email;
  password: Password;
}

interface CreateUserInput {
  role?: Role;
  name?: string;
  email: Email;
  password: Password;
}

export const createUser = (input: CreateUserInput): User => ({
  ...input,
  id: uuid(),
  role: input.role ?? "user",
});
