import express  from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addCars , deleteCar, getAllCars, getCarById, myCars, updateCar } from "../controllers/carController.js";



const router = express.Router();


router.post ('/add', isAuthenticated , addCars )
router.get ('/mycars', isAuthenticated , myCars )
router.put ('/:id', isAuthenticated , updateCar )
router.delete ('/:id', isAuthenticated , deleteCar )
router.get('/allcars' , getAllCars)
router.get('/:id' , isAuthenticated,   getCarById)




export default router