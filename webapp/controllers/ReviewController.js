const Review = require('../models/Review');
const Campaign = require('../models/Campaign');

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
    // console.log('Imprimo req.params en el POST de CREATE REVIEW => ');
    // console.log(req.params); // Respuesta de la URL /:id
    // console.log('Imprimo req.locals.user en el POST de CREATE REVIEW => ');
    // console.log(res.locals.user); // Exportado globalmente por middleware de Marc
    // console.log('Imprimo req.body en el POST de CREATE REVIEW => ');
    // console.log(req.body); // Esta es la respuesta del Post
    // console.log('Imprimo idCampaign en el POST de CREATE REVIEW => ');
    // console.log(idCampaign.id);
    Campaign.find({_id: req.params.id}, (err, campaign) => {
      if (err) {
        console.log(err);
      }
      console.log('IMPRIMO CAMPAIGN EN REVIEW DESPUÉS DE FIND ONE => ');
      console.log(campaign[0].refCreatorId);
      console.log(campaign);
      let newReview = new Review({
        campaignId: req.params.id,
        senderId: res.locals.user._id,
        senderName: res.locals.user.username,
        receiverId: campaign[0].refCreatorId,
        title: req.body.title,
        description: req.body.description,
        stars: req.body.stars,
        city: req.body.city,
        isRespond: false
      });
      console.log('Imprimo newReview antes de crearla => ');
      console.log(newReview);
      newReview.save()
      .then((result, err) => {
        console.log('He llegado hasta aquí, hago el then RESULT =>');
        console.log(result);
        console.log('He llegado hasta aquí, hago el then ERR =>');
        console.log(err);
        // res.redirect('/campaign');
        // Este código que renderice campaing con la ID que tenía
        console.log(req.params.id);
        res.redirect(`../../campaign/${req.params.id}/detail`);
      })
      .catch(error => next(error));
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
