import multer from "multer";
import path from "path";
import crypto from "crypto";
import { request } from "express";

const MulterConfig = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "uploads"),

        filename: (request, file, callback) => {
            const hash = crypto.randomBytes(6).toString("hex");
            const filename = `${hash}-${file.originalname}`;

            callback(null, filename);
        },
    }),

    limits:{fileSize: 10000000},
};

export default MulterConfig;