const Campaign = require('../models/Campaign');

module.exports = {
  index: (req, res, next) => {
    Campaign.find({}, (err, campaign) => {
      res.render('campaigns/campaigns', {
        title: 'Express Juan',
        campaigns: campaign
      });
    });
  },

  createCampaignGet: (req, res, next) => {
    res.render('campaigns/campaignCreate');
  },

  createCampaignPost: (req, res, next) => {
    let newCampaign = new Campaign({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
      lat: req.body.latitude,
      log: req.body.longitude,
      isCompleted: false,
      refCreatorId: res.locals.user._id,
      refCreatorName: res.locals.user.username,
      photoURL: 'http://lorempixel.com/200/200/'
    });
    console.log(newCampaign);
    newCampaign.save((err) => {
      if (err) {
        return err;
      } else {
        return res.redirect("/campaign");
      }
    });
  },

  campaignDetail: (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      res.render('campaigns/campaignDetail', {
        title: 'Express Juan',
        campaign: campaign,
        user: res.locals.user
      });
    });
  },

  campaignDelete: (req, res, next) => {
    let id = req.params.id;
    Campaign.findByIdAndRemove(id, (err, obj) => {
      if (err) {
        return next(err);
      }
      res.redirect("/campaign");
    });
  },

  campaignUpdateGet: (req, res, next) => {
    console.log('Req.Params impreso =>');
    console.log(req.params.id);
    Campaign.findById(req.params.id, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      res.render('campaigns/campaignUpdate', {
        title: 'La campaña de Juanito',
        campaign: campaign
      });
    });
  },

  campaignUpdatePost: (req, res, next) => {
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
    Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/campaign/${result._id}/detail`);
    });
  },

  campaignRequestPost: (req, res, next) => {
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
    } else if (!req.body.requestCampaign){
      const updates = {
        isGoingToWaitName: '',
        isGoingToWaitId: '',
        isRequest: false
      };
      Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    }
    res.redirect(`/campaign/${req.params.id}/detail`);
  },

  campaignMarkAsCompletePost: (req, res, next) => {
    if (req.body.requestCampaign == 'on') {
      const updates = { isCompleted: true };
      Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
        if (err) {
          console.log(err);
        }
      });
    } else if (!req.body.requestCampaign){
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
