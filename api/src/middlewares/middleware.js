const authAdmins = (req, res, next) => {
  const { role } = req.headers;
  if (role) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};

const authAdmins1 = (req, res, next) => {
  const { role } = req.body;
  if (role) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized" });
  }
};


module.exports = { authAdmins, authAdmins1 };
