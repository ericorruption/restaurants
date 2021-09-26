import "dotenv/config";

import fs from "fs";
import path from "path";

import { ApolloServer } from "apollo-server";

import type { Resolvers } from "./generated.types";
import { queryResolvers } from "./resolvers/query";
import { mutationResolvers } from "./resolvers/mutation";
import { context } from "./context";
// import { userResolvers } from "./resolvers/User";
// import { subscriptionResolvers } from "./resolvers/Subscription";

const resolvers: Resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  // Subscription: subscriptionResolvers,
  // User: userResolvers,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context,
});

void server
  .listen()
  .then(({ url }) => console.log(`Server is running on ${url}`));
