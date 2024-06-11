import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

const limit = "16kb";

app.use(
    express.json({
        limit: { limit },
    })
);

app.use(express.urlencoded({ extended: true, limit: { limit } }));

app.use(express.static("public"));

app.use(cookieParser());

// Routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter)

export { app };
