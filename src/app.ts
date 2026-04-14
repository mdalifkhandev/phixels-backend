import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import notFound from "./app/middleware/notFound";
import { Routers } from "./app/router";
import globalError from "./app/middleware/globalError";

import { initProjectRequestCron } from "./app/module/projectRequest/projectRequest.cron";

dotenv.config();

// Force restart for new email templates
const app = express();

// Initialize Cron Jobs
initProjectRequestCron();

app.use(express.json());

app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin: (_origin, callback) => {
      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "ngrok-skip-browser-warning",
    ],
  }),
);

app.use(cookieParser());

app.use("/api/v1", Routers);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(globalError);
app.use(notFound);

export default app;
