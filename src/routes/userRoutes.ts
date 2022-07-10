import express from 'express';
import * as userController from '../controllers/userController';
import { validateBody, validateParams } from '../middlewares/schemaValidation'
import { createUserSchema, updateUserBodySchema, UserParamsSchema } from '../schemas/userSchema'
import { authenticateToken } from "../middlewares/authentication";

const router = express.Router();

router.post("/users", 
    validateBody(createUserSchema), 
    userController.create
);

router.get("/users", 
    userController.findAll
);

router.get("/users/:id",
    validateParams(UserParamsSchema),  
    authenticateToken,
    userController.findOne
);

router.put("/users/:id", 
    validateBody(updateUserBodySchema), 
    validateParams(UserParamsSchema), 
    authenticateToken,
    userController.update
);

export default router;
