const Campaign = require('../models/Campaign');
const Review = require('../models/Review');

module.exports = {
  index: (req, res, next) => {
    console.log('Renderizo campañas /campaign a pelo imprimo res.locals.users =>');
    console.log(res.locals.user);
    Campaign.find({}, (err, campaign) => {
      res.render('campaigns/campaigns', {
        campaigns: campaign,
        user: res.locals.user
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
      isRequest: false,
      refCreatorId: res.locals.user._id,
      refCreatorName: res.locals.user.username,
      photoURL: 'http://lorempixel.com/200/200/'
    });
    console.log('Crear nueva campaña en la base de datos =>');
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
      Review.find({campaignId: req.params.id}, (err, review) => {
        console.log('Imprimir review dentro de Campaign Detail =>');
        console.log(review);
        console.log('Imprimir campaña dentro de Campaign Detail =>');
        console.log(campaign);
          res.render('campaigns/campaignDetail', {
            title: 'Express Juan',
            campaign: campaign,
            user: res.locals.user,
            review: review
          });
      });
    });
  },

  campaignDelete: (req, res, next) => {
    let id = req.params.id;
    Campaign.findByIdAndRemove(id, (err, obj) => {
      console.log('Imprimir campaña dentro antes de eliminarla =>');
      console.log(obj);
      if (err) {
        return next(err);
      }
      res.redirect("/campaign");
    });
  },

  campaignUpdateGet: (req, res, next) => {
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
    let updates = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      photoURL: req.body.photoURL
    };
    console.log('Imprimir update antes de guardarla =>');
    console.log(updates);
    Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log('Imprimir update después de guardarla =>');
      console.log(result);
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
        console.log('Imprimir actualización de estado de campaña (alguien la hace) =>');
        console.log(result);
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
        console.log('Imprimir actualización de estado de campaña (dejan de hacer la campaña) =>');
        console.log(result);
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
        console.log('Marcar campaña como completa (el creador la marca) =>');
        console.log(result);
      });
    } else if (!req.body.requestCampaign){
      const updates = { isCompleted: false };
      Campaign.findByIdAndUpdate(req.params.id, updates, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log('Marcar campaña como incompleta (el creador la desmarca) =>');
        console.log(result);
      });
    }
    res.redirect(`/campaign/${req.params.id}/detail`);
  }
};
