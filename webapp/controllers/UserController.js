const User = require('../models/User');

module.exports = {

  userUpdateGet: (req, res, next) => {
    console.log('Req.Params impreso =>');
    console.log(req.params.id);
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.render('editUser', {
        user : user
      });
    });
  },

  userUpdatePost: (req, res, next) => {
    let updates = {
      username: req.body.username,
      email: req.body.email,
      pic_path: `../uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    };
    console.log(updates);
    User.findByIdAndUpdate(req.params.id, updates, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.redirect('../../auth/profile');
    });
  }
};
