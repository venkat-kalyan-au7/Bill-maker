import express from "express"
import {auth} from "../middleware/auth"
import {authenticated,
        register,
        login,
        logout} from "../controllers/authcontroller"
const router = express.Router()

router.post('/register',register)
router.post('/login',login)
router.get('/auth',auth,authenticated)
router.get('/logout',auth,logout)

module.exports = router