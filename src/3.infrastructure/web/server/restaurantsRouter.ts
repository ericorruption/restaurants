import { Router } from "express";

const router = Router();

router.get("/", function (_, res) {
  res.send("respond with a resource");
});

export default router;
