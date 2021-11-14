import multer from 'multer';

const handleDestination = (req, file, cb) => {
  return cb(null, `savedImages/`);
};

const handleFilename = (req, file, cb) => {
  return cb(null, `${new Date().toISOString()}_${file.originalname}`);
};

const storage = multer.diskStorage({
  destination: handleDestination,
  filename: handleFilename,
});

const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.includes('image');
  if (isImage) return cb(null, true);
  return cb(null, false);
};

const handleImageUpload = multer({ storage, fileFilter });

export default handleImageUpload;
