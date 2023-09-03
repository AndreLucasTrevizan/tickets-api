import multer from 'multer';

// Storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'src/uploads/attachments');
  },
  filename: function (req, file, cb) {
    //Removing the original file extension
    const filenameParts = file.originalname.split('.');

    const extensionFile = filenameParts[filenameParts.length - 1];

    //Creating a new random code to be the new name of the file
    const newFilename = Date.now();

    //Setting the new filename
    cb(null, `${newFilename}.${extensionFile}`);
  }
});

export const uploadFiles = multer({ storage, limits: { fieldSize: 25600 } });
