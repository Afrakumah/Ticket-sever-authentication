import { Router } from "express";
import { allTicketsByUser, allUsers, changePassword, forgotPassword, logOut, login, resetPassword, signup } from "../controller/userController.js";
import { authUser } from "../middleware/auth.js";

const router = Router();

router.post('/', signup);
router.post('/login', login);
router.get('/logout', logOut);
router.get('/', allUsers )
router.get('/:id', authUser, allTicketsByUser);
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.put('/change-password', authUser, changePassword)

//authUser is the middleware

export default router;