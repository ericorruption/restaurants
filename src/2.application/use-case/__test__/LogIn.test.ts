import { LogIn } from "../auth/LogIn";

import { MockAuthenticationService } from "./MockAuthenticationService";
import { MockUserRepository } from "./repository/MockUserRepository";

const mockAuthenticationService = new MockAuthenticationService();

test("LogIn use case", async () => {
  const userRepository = new MockUserRepository([
    {
      id: "1",
      email: "test.email@gmail.com",
      password: "password",
      role: "user",
    },
  ]);
  const login = new LogIn(userRepository, mockAuthenticationService);

  await expect(
    login.execute({ email: "test.email@gmail.com", password: "password" })
  ).resolves.toBe("mock");
});

test("LogIn use case: non-existent account", async () => {
  const userRepository = new MockUserRepository();
  const login = new LogIn(userRepository, mockAuthenticationService);

  await expect(
    login.execute({
      email: "nonexistentemail@gmail.com",
      password: "password",
    })
  ).rejects.toThrow();
});

test("LogIn use case: invalid password", async () => {
  const userRepository = new MockUserRepository([
    {
      id: "1",
      email: "test.email@gmail.com",
      password: "password",
      role: "user",
    },
  ]);
  const login = new LogIn(userRepository, mockAuthenticationService);

  await expect(
    login.execute({
      email: "test.email@gmail.com",
      password: "incorrect-password",
    })
  ).rejects.toThrow();
});
