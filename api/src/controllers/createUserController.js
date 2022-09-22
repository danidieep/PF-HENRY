const { User } = require("../db");

const createUser = async (name, lastname, email, password, dateBorn, role) => {
  const userCreate = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      lastname,
      email,
      password,
      dateBorn,
      role,
    },
  });
};

module.exports = createUser;
