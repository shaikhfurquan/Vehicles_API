
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import UserModel from '../models/userModel.js';

dotenv.config()

const SEC_KEY = process.env.SEC_KEY

const isAuthenticated = async (req, res, next) => {

    //token comming from cookie
    const { token } = req.cookies
    console.log(token);

    //If token is not available then
    if (!token) return res.status(404).json({
        success: false,
        message: "Please Login..."
    })

    //If token is available in browser then we have to verify it
    const decode = jwt.verify(token, SEC_KEY)
    // console.log("decoded data -->" , decode);

    req.user = await UserModel.findById(decode._id)
    // console.log(req.user);

    next()

}

export {isAuthenticated}