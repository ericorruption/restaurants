import type { QueryResolvers } from "../generated.types";

export const queryResolvers: QueryResolvers = {
  restaurants: (_, args, context) => {
    return context.app.useCases.listRestaurants.execute(args);
  },
};
