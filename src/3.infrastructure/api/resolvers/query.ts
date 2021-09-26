import type { QueryResolvers } from "../generated.types";

export const queryResolvers: QueryResolvers = {
  restaurants: (_, __, context) => {
    return context.app.useCases.listRestaurants.execute(context);
  },
};
