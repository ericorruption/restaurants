import type { User } from "../../1.domain/User";

export type LoggedUser = Omit<User, "password">;
