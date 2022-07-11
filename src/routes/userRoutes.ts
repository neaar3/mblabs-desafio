import express from 'express';
import * as userController from '../controllers/userController';
import { validateBody, validateParams } from '../middlewares/schemaValidation'
import { createUserSchema, updateUserBodySchema, UserParamsSchema } from '../schemas/userSchema'
import { authenticateToken } from "../middlewares/authentication";

const userRouter = express.Router();

userRouter.post("/users", 
    validateBody(createUserSchema), 
    userController.create
);

userRouter.get("/users", 
    userController.findAll
);

userRouter.get("/users/:id",
    validateParams(UserParamsSchema),  
    authenticateToken,
    userController.findOne
);

userRouter.put("/users/:id", 
    validateBody(updateUserBodySchema), 
    validateParams(UserParamsSchema), 
    authenticateToken,
    userController.update
);

export default userRouter;
