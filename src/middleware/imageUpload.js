import multer from "multer";

// Configring multer for file uploads
// Product image upload middleware

const productImageDiskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/product/img');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = 'product-' + Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
})

const imageFilter = (req, file, cb) => {
    // Accept image files only
    if (!file.mimetype.startsWith('image/')) {
        return cb(new Error('Please upload an image file'), false);
    }
    cb(null, true);
}

export const imageUpload = multer({
    storage: productImageDiskStorage,
    fileFilter: imageFilter
});