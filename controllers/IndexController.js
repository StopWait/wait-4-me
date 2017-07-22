const GlobalRoutes = require('../config/globalRoutes');
module.exports = {
  index: (req, res, next) => {
    console.log(res.locals.user);
    res.render(GlobalRoutes.Index.Index, { user: res.locals.user }); }, };
