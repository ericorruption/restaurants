import type { User } from "../../../1.domain/User";

export const regularUser: User = {
  id: "regular-user",
  email: "",
  password: "",
  role: "user",
};

export const ownerUser: User = {
  id: "owner-user",
  email: "",
  password: "",
  role: "owner",
};
