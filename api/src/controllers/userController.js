const { User } = require("../db");

const getUsers = async () => {
  try {
    const getUsers = await User.findAll();
    return getUsers;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getUsers;
