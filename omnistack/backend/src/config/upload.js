const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const file_extension = path.extname(file.originalname);
            const file_name = path.basename(file.originalname, file_extension);

            cb(null, `${file_name}-${Date.now()}${file_extension}`);
        }
    }),
};
