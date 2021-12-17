module.exports = {
  isAuthenticated: (req, res, next) => {
    if (!req.session.userId) {
      res.json({ status: "failed", message: "Not logged in" });
      return;
    }
    next();
  },
};
