const {ensureLoggedIn} = require("connect-ensure-login");
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

module.exports = {
  EnsureLoggedIn: ensureLoggedIn('../../auth/login'),
  UploadFile: upload.single('avatar-1')
};
