const Review = require('../models/review');
// const mongoose = require('mongoose');
// const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = {
  createReviewGet: (req, res, next) => {
    // console.log('Imprimo req.params en el GET de CREATE REVIEW => ');
    // console.log(req.params);
    // console.log('Imprimo res.user en el GET de CREATE REVIEW => ');
    // console.log(res.locals.user);
    res.render('createReview', {
      user: res.locals.user,
      idCampaign: req.params
    });
  },
  // Pendiente crear vistas de review y guardarlas en la base de datos
  createReviewPost: (req, res, next) => {
    console.log('Imprimo req.params en el POST de CREATE REVIEW => ');
    console.log(req.params); // Respuesta de la URL /:id
    console.log('Imprimo req.locals.user en el POST de CREATE REVIEW => ');
    console.log(res.locals.user); // Exportado globalmente por middleware de Marc
    console.log('Imprimo req.body en el POST de CREATE REVIEW => ');
    console.log(req.body); // Esta es la respuesta del Post
    // console.log('Imprimo idCampaign en el POST de CREATE REVIEW => ');
    // console.log(idCampaign.id);
    let newReview = new Review({
      campaignId: req.params.id,
      senderId: res.locals.user._id,
      title: req.body.title,
      description: req.body.description,
      stars: req.body.stars,
      city: req.body.city,
      isRespond: false
    });
    console.log('Imprimo newReview antes de crearla => ');
    console.log(newReview);
    newReview.save((err) => {
      if (err) {
        console.log('Devuelvo ERROR en el Save de Create Review => ');
        return err;
      } else {
        console.log('REVIEW CREADA CON EXITO');
        console.log(newReview);
        res.redirect('/campaign');
        // Este código que renderice campaing con la ID que tenía
        // return Campaign.findById(req.params.id, (err, campaign) => {
        //   if (err) {
        //     console.log(err);
        //   }
        //   res.render('campaigns/campaignDetail', {
        //     campaign: campaign
        //   });
        // });
      }
    });
  },

  reviewDelete: (req, res, next) => {
    let id = req.params.id;
    Review.findByIdAndRemove(id, (err, obj) => {
      if (err) {
        return next(err);
      }
      res.redirect("/campaign");
    });
  },

  reviewUpdateGet: (req, res, next) => {
    console.log('Req.Params impreso =>');
    console.log(req.params.id);
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

  reviewUpdatePost: (req, res, next) => {
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
