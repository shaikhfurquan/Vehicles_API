
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const SEC_KEY = process.env.SEC_KEY
const NODE_ENV = process.env.NODE_ENV

const generateCookie = (user, res, statusCode = 200, message) => {

    //token
    // const token = jwt.sign({user}, '!@#$%^&*()')
    const token = jwt.sign({ _id: user._id }, SEC_KEY)
    console.log(token);

    res.status(201).cookie("token", token, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000,
        // sameSite : NODE_ENV === "Development" ? "lax" : "node",
        // secure : NODE_ENV === "Development" ? false:true
    }).json({
        success: true,
        message
    })
}


export default generateCookie