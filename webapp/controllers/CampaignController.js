const Campaign = require('../models/Campaign');

module.exports = {
  index: (req, res, next) => {
    res.render('campaign');
  },
  createGet: (req, res, next) => {
    res.render('campaign-create');
  },
  createPost: (req, res, next) => {
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
  }
};
