import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("*---- ERROR: ", error);
            process.exit(1);
        });

        app.listen(port, () => {
            console.log(`*---- Server listening on port: ${port} ----*`);
        });

        console.log("*---- CONNECTED TO MONGODB ----*");
    })
    .catch((err) => {
        console.log("*---- MONGODB CONNECTION FAILED: ", err);
        // process.exit(1);
    });

/*
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log("*---- ERROR: ", error);
        });

        app.listen(process.env.PORT, () => {
            console.log(
                `*---- Server listening on port ${process.env.PORT} ----*`
            );
        });

        console.log("*---- CONNECTED TO MONGODB ----*");
    } catch (error) {
        console.log("*---- MONGODB CONNECTION ERROR: ", error);
        throw err;
    }
})();
*/
