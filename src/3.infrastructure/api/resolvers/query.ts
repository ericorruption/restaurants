import type { QueryResolvers, Role } from "../generated.types";

export const queryResolvers: QueryResolvers = {
  restaurants: (_, args, context) => {
    if (args.ownerId) {
      return context.app.useCases.listOwnerRestaurants.execute({
        ownerId: args.ownerId,
        user: context.user,
      });
    }

    return context.app.useCases.listRestaurants.execute(context);
  },
  restaurant: (_, { id }, context) => {
    return context.app.useCases.getRestaurant.execute({
      restaurantId: id,
      user: context.user,
    });
  },
  me: async (_, __, context) => {
    const user = await context.app.useCases.getUser.execute({
      user: context.user,
    });

    if (!user) {
      return null;
    }

    return { ...user, role: user.role.toUpperCase() as Role };
  },
};
