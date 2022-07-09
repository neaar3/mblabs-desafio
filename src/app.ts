import "./config";
import "express-async-errors";
import express, { Express, json } from "express";
import cors from "cors";
import errorHandling from "./middlewares/errorHandling";
import router from "./routes";
import { connectDB, disconnectDB } from "./config";

const app = express();

app
  .use(cors())
  .use(json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use(router)
  .use(errorHandling);

  export function init(): Promise<Express> {
    connectDB();
    return Promise.resolve(app);
  }
  
  export async function close(): Promise<void> {
    await disconnectDB();
  }
  
  export default app;