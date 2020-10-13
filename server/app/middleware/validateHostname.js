const isValidDomain = require('is-valid-domain');
const isIp = require('is-ip');

isValidIpOrDomain = (req, res, next) => {
  const value = req.body.hostname;
  if (isValidDomain(value) || isIp(value)) {
    next();
    return;
  }

  res.status(400).send({
    message: 'Invalid hostname!'
  });
  return;
};

const validateHostname = {
  isValidIpOrDomain: isValidIpOrDomain
};

module.exports = validateHostname;
