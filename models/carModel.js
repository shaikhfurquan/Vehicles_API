
import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    variant: {
        type: String,
        required: true,
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'CarSchema',
        required : true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now()
    }
})


const CarModel = new mongoose.model('car' , CarSchema)

export default CarModel