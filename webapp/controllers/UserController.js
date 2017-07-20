const User = require('../models/User');
const Review = require('../models/Review');

module.exports = {

  userProfileGet: (req, res, next) => {

    console.log('desde PROFILE imprimo res.locals =>');
    Review.find({senderId: req.params.id}, (err, reviews) => {
      // console.log('IMPRIMO LAS REVIEWS DEL USER => ');
      // console.log(reviews);
      console.log(res.locals);
      res.render('profile', {
        user: res.locals.user,
        reviews: reviews
      });
    });
  },

  userUpdateGet: (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.render('editUser', {
        user: user
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
    User.findByIdAndUpdate(req.params.id, updates, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.redirect('../../user/profile');
    });
  }
};
