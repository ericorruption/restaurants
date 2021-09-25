import { InMemoryAuthorizationService } from "../../../3.infrastructure/InMemoryAuthorizationService";
import { CreateRestaurant } from "../CreateRestaurant";

import { MockRestaurantRepository } from "./MockRestaurantRepository";

test("CreateRestaurant use case", async () => {
  const createRestaurant = new CreateRestaurant(
    new MockRestaurantRepository(),
    new InMemoryAuthorizationService()
  );

  expect.assertions(2);

  expect(
    createRestaurant.execute({
      user: {
        id: "1",
        role: "owner",
      },
    })
  ).resolves.toBeUndefined();

  expect(
    createRestaurant.execute({
      user: {
        id: "2",
        role: "regular",
      },
    })
  ).rejects.toThrowError();
});
