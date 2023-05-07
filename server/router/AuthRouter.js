import Router from 'express';
import AuthController from "../controllers/AuthController.js";

const router = new Router();

router.post('/register', AuthController.register_user);
router.post('/login', AuthController.login_user);
router.put('/logout/:id', AuthController.logout_user);
router.delete('/delete/:id', AuthController.delete_user);
router.get('/check_access_token', AuthController.check_access_token);
router.get('/check_refresh_token', AuthController.check_refresh_token);
export default router;