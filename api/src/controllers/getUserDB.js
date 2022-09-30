const { User } = require("../db");

const getUserDB = async () => {
  const users = await User.findAll();

  const info = users.map((u) => {
    return {
      id: u.id,
      cartId: u.cartId,
      favId: u.favId,
      name: u.name,
      lastname: u.lastname,
      email: u.email,
      dateBorn: u.dateBorn,
      password: u.password,
      role: u.role,
      ban: u.ban
    }
  });

  return info;
};


module.exports = { getUserDB };
