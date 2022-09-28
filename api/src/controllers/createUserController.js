const { User } = require("../db");

const createUser = async (name, lastname, email, password, dateBorn, role, userCartId, userFavId) => {
  const userCreate = await User.findOrCreate({
    where: { email },
    defaults: {
      cartId: userCartId,
      favId: userFavId,
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
