import "dotenv/config";

import fs from "fs";
import path from "path";

import { ApolloServer } from "apollo-server";

import type { Resolvers } from "./generated.types";
import { queryResolvers } from "./resolvers/query";
import { mutationResolvers } from "./resolvers/mutation";
import { context } from "./context";
import { userResolvers } from "./resolvers/user";
import { adminMutationResolvers } from "./resolvers/adminMutationResolvers";

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: { ...mutationResolvers, ...adminMutationResolvers },
  User: userResolvers,
};

export const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context,
});
