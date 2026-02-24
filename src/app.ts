import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./app/middleware/notFound";
import { Routers } from "./app/router";
import globalError from "./app/middleware/globalError";

dotenv.config();

const app = express();
const explicitAllowedOrigins = (
  process.env.CORS_ORIGINS ||
  "https://phixels.agency,https://www.phixels.agency,https://rurally-unparticular-lilliana.ngrok-free.dev"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalDevOrigin = (origin: string) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (isLocalDevOrigin(origin) || explicitAllowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
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
