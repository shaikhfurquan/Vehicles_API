import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';
import generateCookie from '../utils/features.js'


const userRegister = async (req, res) =>{
    const {name, email , password} = req.body

    //check if user is already registered or not
    let user = await UserModel.findOne({ email })
    if(user) return res.send({
        success : false,
        message : "User already registered..."
    })

    //If user not found, Registering the user with hashpassword
    const hashpassword = await bcrypt.hash(password , 10)
    user = await UserModel.create({
        name, 
        email, 
        password : hashpassword
    })

    generateCookie(user , res , 201 , `${user.name} Register Successfully...`)
}


const userLogin = async (req,res) =>{
    const {email,password} = req.body

    //check if user exists or not
    let user = await UserModel.findOne ({ email })

    //if user is not found then
    if(!user) return res.status(404).json({
        success: false,
        message : "User not found, Register the user first..."
    })

    //if user found then we will verify that password
    const isMatch = await bcrypt.compare(password , user.password)

    //if password is not match then
    if(!isMatch) return res.status(404).json({
        success: false,
        message : "Invalid Credentials..."
    })

    //if password match then
    generateCookie(user , res , 201 , `Welcome ${user.name}`)

}

//User logout
const userLogout = (req, res) => {
    
    res.status(200).cookie("token" , "" , {
        expires : new Date(Date.now())
    }).json({
        success : true,
        message : "User logged-Out successfully..."
    })
}


//getting the user profile
const getMyProfile = (req, res) =>{
    res.status(200).json({
        success : true,
        user : req.user
    })
}

//get user by Id
const getUserById = async (req, res) =>{
    const id = req.params.id
    const user = await UserModel.findById(id)

    if(!user) return res.status(404).json({
        success : false,
        message : "Invalid ID"
    })

    res.send({
        success : true,
        message : "This is the user...",
        user
    })

}
export {
    userRegister , userLogin , userLogout, getMyProfile , getUserById
}