import type { Id } from "./shared-kernel";

export type UserId = Id;

export interface User {
  id: UserId;
  role: "regular" | "owner" | "admin";
}
