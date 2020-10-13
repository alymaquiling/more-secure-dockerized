exports.pingHost = (req, res) => {
  const ping = require('ping');
  const host = req.body.hostname;
  (async () => {
    try {
      const isAlive = await ping.promise.probe(host, { timeout: 10 });
      const msg = isAlive
        ? 'host ' + host + ' is alive'
        : 'host ' + host + ' is dead';
      res.send({ message: msg });
    } catch (error) {
      res.status(500).send({ message: err.message });
    }
  })();
};
