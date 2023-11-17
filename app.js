import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/global-error-handler.js";
import apiRouter from "./routes/api.routes.js";
import { validateToken } from "./middlewares/auth.middleware.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/", (req, res, next) => {
//   try {
//     throw new Error("working json");
//   } catch (err) {
//     next(err);
//   }
// });

app.use("/api", apiRouter);
app.use(globalErrorHandler);
app.use(validateToken);

export default app;
