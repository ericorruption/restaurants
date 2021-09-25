import { CreateUser } from "../auth/CreateUser";

import { MockUserRepository } from "./MockUserRepository";

test("CreateUser use case", async () => {
  const userRepository = new MockUserRepository();
  const createUser = new CreateUser(userRepository);

  expect.assertions(1);

  await expect(
    createUser.execute({ email: "new user", password: "TODO" })
  ).resolves.toBeUndefined();
});
