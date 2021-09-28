import type { Restaurant } from "../../../../1.domain/Restaurant";
import { RestaurantService } from "../../../RestaurantService";
import { GetRestaurant } from "../../restaurant/GetRestaurant";
import { regularUser } from "../fixtures";
import { MockRestaurantRepository } from "../repository/MockRestaurantRepository";
import { MockReviewRepository } from "../repository/MockReviewRepository";

const mockRestaurant: Restaurant = {
  id: "1",
  name: "Restaurant 1",
  ownerId: "1",
};

test("GetRestaurant use case", async () => {
  const mockRestaurantRepository = new MockRestaurantRepository();
  const mockReviewRepository = new MockReviewRepository();
  const getRestaurant = new GetRestaurant(
    new RestaurantService(mockRestaurantRepository, mockReviewRepository)
  );

  await expect(
    getRestaurant.execute({
      restaurantId: mockRestaurant.id,
      user: regularUser,
    })
  ).resolves.toBeTruthy();
});

test("GetRestaurant use case fails for unauthenticated users", async () => {
  const mockRestaurantRepository = new MockRestaurantRepository();
  const mockReviewRepository = new MockReviewRepository();
  const getRestaurant = new GetRestaurant(
    new RestaurantService(mockRestaurantRepository, mockReviewRepository)
  );

  await expect(
    getRestaurant.execute({ restaurantId: mockRestaurant.id })
  ).rejects.toThrow();
});
