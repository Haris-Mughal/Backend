import { v2 as cloudinary } from "cloudinary";
import fileSystem from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadFile = async (filePath) => {
    try {
        if (!filePath) return null

        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto"
        })

        console.log("*---- SUCCESSFULLY UPLOADED ", result.url)

        return result

    } catch (err) {
        fileSystem.unlinkSync(filePath)

        console.log("*---- ERROR: ", err);

        return null

    }
}

export { uploadFile }
