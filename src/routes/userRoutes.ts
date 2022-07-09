import express from 'express';
import * as userController from '../controllers/userController';
import { validateBody } from '../middlewares/schemaValidation'
import { userSchema } from '../schemas/userSchema'

const router = express.Router();

router.post("/users", validateBody(userSchema), userController.create);
router.get("/users", userController.findAll);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", userController.update);

export default router;
