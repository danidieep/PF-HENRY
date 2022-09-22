const { User } = require("../db");

const getUserDB = async () => {
  const users = await User.findAll();

  const info = users.map((u) => {
    return {
      id: u.id,
      cartId: u.cartId,
      name: u.name,
      lastname: u.lastname,
      email: u.email,
      dateBorn: u.dateBorn,
      password: u.password,
      role: u.role,
    }
  });

  return info;
};


module.exports = { getUserDB };
