const Campaign = require('../models/Campaign');
const GlobalRoutes = require('../config/globalRoutes');
const Review = require('../models/Review');

module.exports = {
  index: (req, res, next) => {
    Campaign.find({}, (err, campaign) => {
      res.render(GlobalRoutes.Campaigns.Index, {
        campaigns: campaign,
        user: res.locals.user
      });
    });
  },

  createGet: (req, res, next) => {
    res.render(GlobalRoutes.Campaigns.Create);
  },
  createPost: (req, res, next) => {
    const newCampaign = new Campaign({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
      lat: req.body.lat,
      log: req.body.log,
      isCompleted: false,
      isRequest: false,
      refCreatorId: res.locals.user._id,
      refCreatorName: res.locals.user.username,
      photoURL: 'http://lorempixel.com/200/200/'
    });
    newCampaign.save((err) => {
      if (err) {
        return err;
      } else {
        return res.redirect("/campaign");
      }
    });
  },

  detail: (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      Review.find({
        campaignId: req.params.id
      }, (err, review) => {
        res.render(GlobalRoutes.Campaigns.Detail, {
          title: 'Express Juan',
          campaign: campaign,
          user: res.locals.user,
          review: review
        });
      });
    });
  },

  delete: (req, res, next) => {
    Campaign.findByIdAndRemove(req.params.id, (err, obj) => {
      if (err) {
        return next(err);
      }
      res.redirect("/campaign");
    });
  },

  editGet: (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      res.render(GlobalRoutes.Campaigns.Update, {
        title: 'La campaña de Juanito',
        campaign: campaign
      });
    });
  },

  editPost: (req, res, next) => {
    const { title, price, description, photoURL } = req.body;
    const updates = { title, price, description, photoURL };
    Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/campaign/${result._id}/detail`);
    });
  },

  requestPost: (req, res, next) => {
    if (req.body.requestCampaign == 'on') {
      const updates = {
        isGoingToWaitName: res.locals.user.username,
        isGoingToWaitId: res.locals.user._id,
        isRequest: true
      };
      Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    } else if (!req.body.requestCampaign) {
      const updates = { isGoingToWaitName: '', isGoingToWaitId: '', isRequest: false };
      Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
    res.redirect(`/campaign/${req.params.id}/detail`);
  },

  markAsCompletePost: (req, res, next) => {
    if (req.body.requestCampaign == 'on') {
      const updates = { isCompleted: true };
      Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log('Marcar campaña como completa (el creador la marca) =>');
        console.log(result);
      });
    } else if (!req.body.requestCampaign) {
      const updates = { isCompleted: false };
      Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
    res.redirect(`/campaign/${req.params.id}/detail`);
  }
};
