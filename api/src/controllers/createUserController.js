const { User } = require("../db");

const createUser = async (name, lastname, email, password, dateBorn, role, userCartId) => {
  const userCreate = await User.findOrCreate({
    where: { email },
    defaults: {
      cartId: userCartId,
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
