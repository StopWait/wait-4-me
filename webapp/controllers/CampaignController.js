const Campaign = require('../models/Campaign');

module.exports = {
  index: (req, res, next) => {
    res.render('campaign');
  },
  createGet: (req, res, next) => {
    res.render('campaign-create');
  },
  createPost: (req, res, next) => {
    console.log(req.body);

    let newCampaign = new Campaign({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
    });
    console.log("NEW CAMPAING =>");
    console.log(newCampaign);
    newCampaign.save((err) => {
      if (err) {
        console.log('Error al guardar campaña');
        return res.render("layout");
      } else {
        console.log('Campaña creada en la base de datos');
        return res.redirect("/");
      }
    });
  }

};
