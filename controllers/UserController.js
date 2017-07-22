const User = require('../models/User');
const Review = require('../models/Review');
const GlobalRoutes = require('../config/globalRoutes');

module.exports = {
  profileGet: (req, res, next) => {
    Review.find({receiverId: res.locals.user._id}, (err, reviews) => {
      // console.log('IMPRIMO LAS REVIEWS DEL USER => ');
      // console.log(reviews);
      res.render(GlobalRoutes.Users.Profile, {
        user: res.locals.user,
        reviews: reviews
      });
    });
  },

  editGet: (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err);
      }
      res.render(GlobalRoutes.Users.Edit, {
        user: user
      });
    });
  },

  editPost: (req, res, next) => {
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
