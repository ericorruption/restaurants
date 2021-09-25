import { AuthorizationService } from "../../AuthorizationService";
import { CreateRestaurant } from "../CreateRestaurant";
import { ownerUser, regularUser } from "./fixtures";
import { MockRestaurantRepository } from "./MockRestaurantRepository";

test("CreateRestaurant use case", async () => {
  const createRestaurant = new CreateRestaurant(
    new MockRestaurantRepository(),
    new AuthorizationService()
  );

  expect.assertions(2);

  await expect(
    createRestaurant.execute({ user: ownerUser })
  ).resolves.toBeUndefined();

  await expect(
    createRestaurant.execute({ user: regularUser })
  ).rejects.toThrowError();
});
