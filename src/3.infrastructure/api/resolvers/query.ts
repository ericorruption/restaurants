import type { QueryResolvers } from "../generated.types";

export const queryResolvers: QueryResolvers = {
  restaurants: (_, __, context) => {
    return context.app.useCases.listRestaurants.execute(context);
  },
  restaurant: (_, { id }, context) => {
    return context.app.useCases.getRestaurant.execute({
      restaurantId: id,
      user: context.user,
    });
  },
};
