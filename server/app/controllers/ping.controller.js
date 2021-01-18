exports.pingHost = (req, res) => {
  const ping = require('ping');
  const host = req.body.hostname;
  (async () => {
    try {
      let pingHost = await ping.promise.probe(host);
      const msg = pingHost.alive
        ? 'host ' + host + ' is alive'
        : 'host ' + host + ' is dead';
      res.send({ message: msg });
    } catch (error) {
      res.status(500).send({ message: err.message });
    }
  })();
};