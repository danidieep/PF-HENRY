const authAdmins = (req, res, next) => {
  const { role } = req.headers;
  if (role) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = authAdmins;
