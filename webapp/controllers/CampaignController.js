const Campaign = require('../models/Campaign');

module.exports = {
  index: (req, res, next) => {
    Campaign.find({}, (err, campaign) => {
      res.render('campaigns', {
        title: 'Express Juan',
        campaigns: campaign
      });
    });
  },

  createCampaignGet: (req, res, next) => {
    res.render('campaign-create');
  },

  createCampaignPost: (req, res, next) => {
    let newCampaign = new Campaign({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
    });
    newCampaign.save((err) => {
      if (err) {
        return err;
      } else {
        return res.redirect("/");
      }
    });
  },

  campaignDetail: (req, res, next) => {
    Campaign.findById(req.params.id, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      res.render('campaignDetail', {
        title: 'Express Juan',
        campaign: campaign
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
      res.render('campaignUpdate', {
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

  }
};
