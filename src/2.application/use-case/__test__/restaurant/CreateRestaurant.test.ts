import { AuthorizationService } from "../../../AuthorizationService";
import { CreateRestaurant } from "../../restaurant/CreateRestaurant";
import { ownerUser, regularUser } from "../fixtures";
import { MockRestaurantRepository } from "../repository/MockRestaurantRepository";

test("CreateRestaurant use case", async () => {
  const createRestaurant = new CreateRestaurant(
    new MockRestaurantRepository(),
    new AuthorizationService()
  );

  expect.assertions(2);

  await expect(
    createRestaurant.execute({ user: ownerUser, name: "Test" })
  ).resolves.toBeTruthy();

  await expect(
    createRestaurant.execute({ user: regularUser, name: "Test" })
  ).rejects.toThrowError();
});
