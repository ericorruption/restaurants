import { server } from "../3.infrastructure/api";

void server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`Server is running on ${url}`));
