import type { User } from "../../../1.domain/User";
import type { QueryResolvers } from "../generated.types";

export const queryResolvers: QueryResolvers = {
  restaurants: (_, __, context) => {
    // TOD Still not sure if passing the whole user object is better
    const tempUserObject = context.userId ? ({} as User) : undefined;
    return context.app.useCases.listRestaurants.execute({
      user: tempUserObject,
    });
  },
};
