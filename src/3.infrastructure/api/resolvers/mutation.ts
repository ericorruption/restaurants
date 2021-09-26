import type { Input } from "../../../2.application/use-case/auth/CreateUser";
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
};