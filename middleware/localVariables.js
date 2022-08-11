module.exports = (req, res, next) => {
  res.locals.user = req.user;
  res.locals.url = req.url;
  next();
};