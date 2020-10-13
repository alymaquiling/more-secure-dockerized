const { validateHostname } = require('../middleware');
const controller = require('../controllers/ping.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/ping',
    [validateHostname.isValidIpOrDomain],
    controller.pingHost
  );
};
