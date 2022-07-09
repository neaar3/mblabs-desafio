import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post("/users", userController.create);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.update);

export default router;
