module.exports = {
  index: (req, res, next) => {
    res.render('index', {
      user: res.locals.user
    });
  },
};
