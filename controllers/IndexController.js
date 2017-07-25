module.exports = {
  index: (req, res, next) => {
    res.render('index/index', { user: res.locals.user }); }, };
