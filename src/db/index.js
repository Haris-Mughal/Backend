import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );
        console.log(
            `\n *---- MONGODB CONNECTED!! -- DB_HOST: ${(await connectionInstance).connection.host} ----*`
        ); // (await connectionInstance) ye suggestion ma aya tha
    } catch (error) {
        console.log("*---- MONGODB CONNECTION FAILED: ", error);
        process.exit(1); // ye node ka tariqa hai error throw krne ka (0, 1, 2 etc. codes hote hain iske)
    }
};

export default connectDB;
