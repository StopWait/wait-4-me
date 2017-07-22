module.exports = {
  index: (req, res, next) => {
    console.log(res.locals.user);
    res.render('index/index', { user: res.locals.user }); }, };
