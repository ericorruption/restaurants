import type { Input } from "../../../2.application/use-case/user/CreateUser";
import type { MutationResolvers } from "../generated.types";

export const mutationResolvers: MutationResolvers = {
  signUp: async (_, { input }, context) => {
    const useCaseInput: Input = {
      ...input,
      name: input.name ?? undefined,
      role: (input.role?.toLowerCase() as "user" | "owner") ?? undefined,
    };

    await context.app.useCases.createUser.execute(useCaseInput);

    return { success: true };
  },
  login: async (_, args, context) => {
    const token = await context.app.useCases.logIn.execute(args);

    return {
      token,
    };
  },
  createRestaurant: async (_, args, context) => {
    const newRestaurant = await context.app.useCases.createRestaurant.execute({
      ...args.input,
      user: context.user,
    });

    return {
      ...newRestaurant,
    };
  },
  reviewRestaurant: async (_, args, context) => {
    const review = await context.app.useCases.reviewRestaurant.execute({
      ...args.input,
      user: context.user,
    });

    return { ...review, rating: review.rating.value };
  },
  replyToReview: async (_, args, context) => {
    await context.app.useCases.replyToReview.execute({
      ...args.input,
      user: context.user,
    });

    return { success: true };
  },
};
