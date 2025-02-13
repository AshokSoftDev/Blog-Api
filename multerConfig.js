import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const savedFilename = uniqueSuffix + path.extname(file.originalname);
        req.savedImageName = savedFilename;
        cb(null, savedFilename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};


const upload = multer({ storage: storage, fileFilter: fileFilter });

export { upload };
