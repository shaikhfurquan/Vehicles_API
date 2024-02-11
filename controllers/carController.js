import CarModel from "../models/carModel.js";


//Adding new cars
const addCars = async (req,resp) =>{
    const {brand, model, capacity, price, variant} = req.body
    // console.log(brand, model, capacity, price, variant)

    await CarModel.create({
        brand,
        model,
        capacity,
        price,
        variant,
        user: req.user
    })
    resp.status(201).json({
        success: true,
        message : "Car record added successfully..."
    })
}

const myCars = async (req,res) => {
    //getting current user id
    const userId = req.user._id
    const cars = await CarModel.find({user : userId})
    res.status(200).json({
        success: true,
        cars
    })
}
//updating the blog wrt Id, current user(login)
const updateCar = async(req,res) =>{
    const {brand, model, capacity, price, variant} = req.body

    const id = req.params.id
    const car = await CarModel.findByIdAndUpdate(id , req.body , {new : true})
    
    //if we have id but blog doesn't present 
    if(!car) return res.status(404).json({
        success: false,
        message: "Invalid ID..."
    })

    //if we got the record then we will update it
    // car.save()
    res.json({
        success: true,
        message: "Car record updated successfully...",
        car
    })
}   


//Delete Car wrt Id, current user(login)
const deleteCar = async (req,res) =>{
    const id = req.params.id
    const car = await CarModel.findById(id)

    //if we have id but blog doesn't present 
    if(!car) return res.status(404).json({
        success: false,
        message: "Invalid ID..."
    })

    await CarModel.deleteOne()
    res.json({
        success: true,
        message: "Car Deleted successfully..."
    })

}

const getAllCars = async (req,res) =>{
    const cars = await CarModel.find()

    if(!cars) return res.status(404).json({
        success: false,
        message: "There Is No Car Records..."
    })

    res.json({
        success: true,
        message : "All Car Records...",
        cars
    })
}

const getCarById = async (req,res) =>{
    const id = req.params.id
    const car = await CarModel.findById(id)

    if(!car) return res.status(404).json({
        success: false,
        message: "Invalid ID"
    })

    res.json({
        success:true,
        message:"Your Car is...",
        car
    })
}

export {addCars, myCars , updateCar , deleteCar, getAllCars , getCarById}