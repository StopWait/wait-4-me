const Review = require('../models/Review');
const Campaign = require('../models/Campaign');

module.exports = {
  createGet: (req, res, next) => {
    res.render('createReview', {
      user: res.locals.user,
      idCampaign: req.params
    });
  },
  createPost: (req, res, next) => {
    Campaign.find({_id: req.params.id}, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      let newReview = new Review({
        campaignId: req.params.id,
        senderId: res.locals.user._id,
        senderName: res.locals.user.username,
        receiverId: campaign[0].refCreatorId,
        title: req.body.title,
        description: req.body.description,
        stars: req.body.stars,
        city: req.body.city,
        isRespond: true
      });
      newReview.save()
      .then((result, err) => {
        res.redirect(`../../campaign/${req.params.id}/detail`);
      })
      .catch(error => next(error));
    });
  },

  delete: (req, res, next) => {
    let id = req.params.id;
    Review.findByIdAndRemove(id, (err, obj) => {
      if (err) {
        return next(err);
      }
      res.redirect("/campaign");
    });
  },

  editGet: (req, res, next) => {
    Review.findById(req.params.id, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      res.render('campaignUpdate', {
        title: 'La campaña de Juanito',
        campaign: campaign
      });
    });
  },

  editPost: (req, res, next) => {
    let {
      title,
      price,
      description,
      photoURL
    } = req.body;
    let updates = {
      title,
      price,
      description,
      photoURL
    };
    console.log(updates);
    Review.findByIdAndUpdate(req.params.id, updates, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/campaign/${result._id}/detail`);
    });
  }
};
