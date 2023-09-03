import multer from 'multer';

// Storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'src/uploads/avatars');
  },
  filename: function (req, file, cb) {
    //Removing the original file extension
    const extensionFile = file.originalname.split('.')[1];

    //Creating a new random code to be the new name of the file
    const newFilename = Date.now();

    //Setting the new filename
    cb(null, `${newFilename}.${extensionFile}`);
  }
});

export const upload = multer({ storage });
