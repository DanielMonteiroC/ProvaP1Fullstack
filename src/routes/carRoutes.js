const express = require("express");
const router = express.Router();
const carController = require("../controllers/carController");

router.get("/cars", carController.listCars);
router.get("/cars/:id", carController.getCar);


router.post('/cars', carController.createCar);
router.put('/cars/:id', carController.updateCar);
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;