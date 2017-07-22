const GlobalRoutes = require('../config/globalRoutes');
module.exports = {
  index: (req, res, next) => {
    res.render(GlobalRoutes.Index.Index, { user: res.locals.user }); }, };
