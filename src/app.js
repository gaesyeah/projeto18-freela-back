import "express-async-errors";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import catalogueRouter from "./routes/catalogue.routes.js";
import breedRouter from "./routes/breeds.routes.js";
import userRouter from "./routes/users.routes.js";
import { errorHandling } from "./middlewares/errorHandling.middleware.js";

const app = express();
app
  .use(express.json(), cors())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/catalogue", catalogueRouter)
  .use("/breed", breedRouter)
  .use("/user", userRouter)
  .use(errorHandling);

dotenv.config();
const { PORT } = process.env;

const port = PORT || 5000;
app.listen(port, () => console.log(`Rodando em http://localhost:${port}`));
