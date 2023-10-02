import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { carMiddleware } from "../middlewares/car.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { CarValidator } from "../validators/car.validator";

const router = Router();

router.get("/", carController.getAll);
router.post(
  "/",
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.createCar,
);

router.get(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById,
);
router.put(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carController.updateCar,
);
router.delete(
  "/:carId",
  commonMiddleware.isIdValid("carId"),
  carController.deleteCar,
);

export const carRouter = router;
