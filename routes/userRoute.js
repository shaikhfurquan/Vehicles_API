import express  from 'express'
import { getMyProfile, getUserById, userLogin, userLogout, userRegister } from '../controllers/userController.js'
import {isAuthenticated} from '../middlewares/auth.js'
const router = express.Router()


router.post('/register' , userRegister)
router.post('/login' , userLogin)
router.get('/logout' , userLogout)
router.get('/myprofile' , isAuthenticated , getMyProfile)
router.get('/:id', getUserById)


export default router