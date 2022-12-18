const { Ipware } = require('@fullerstack/nax-ipware');

const ipware = new Ipware();

function bindController(fn) {
  return (req, res, next) => {
    fn(
      {
        ...req.query,
        ...req.params,
        ...req.body,
      },
      { ipAddress: ipware.getClientIP(req), userAgent: req.get('User-Agent') },
    )
      .then((apiResponse) => {
        res.status(apiResponse.status).send(apiResponse.data);
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };
}

module.exports = bindController;
