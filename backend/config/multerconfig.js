const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'user_profiles', // You can change this to resume/refrence etc based on logic
      allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'doc', 'docx'],
      resource_type: 'raw',
      public_id: file.originalname.split('.')[0] + '-' + Date.now()
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
