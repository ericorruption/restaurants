import { Router } from "express";
import { ListRestaurants } from "../../../2.application/use-case/ListRestaurants";
import { InMemoryRestaurantRepository } from "../../InMemoryRestaurantRepository";

const router = Router();

router.get("/", async (req, res) => {
  // TODO share instance
  const inMemoryRestaurantRepository = new InMemoryRestaurantRepository();
  const listRestaurantsUseCase = new ListRestaurants(
    inMemoryRestaurantRepository
  );

  const restaurants = await listRestaurantsUseCase.execute();

  res.send(restaurants);
});

export default router;
