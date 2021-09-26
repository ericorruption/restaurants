import { CreateUser } from "../auth/CreateUser";

import { MockUserRepository } from "./MockUserRepository";

test("CreateUser use case", async () => {
  const userRepository = new MockUserRepository();
  const createUser = new CreateUser(userRepository);

  expect.assertions(1);

  await expect(
    createUser.execute({ email: "new-user@gmail.com", password: "TODO" })
  ).resolves.toBeUndefined();
});

test("CreateUser does not create users for the same email address", async () => {
  const userRepository = new MockUserRepository();
  const createUser = new CreateUser(userRepository);

  await createUser.execute({ email: "new-user@gmail.com", password: "TODO" });

  expect.assertions(1);

  await expect(
    createUser.execute({ email: "new-user@gmail.com", password: "TODO" })
  ).rejects.toThrow();
});
