const { User } = require("../db");

const createUser = async (name) => {
  try {
    const userCreate = await User.findOrCreate({
      where: { name: name },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createUser;