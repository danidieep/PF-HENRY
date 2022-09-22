const { User } = require("../db");

const getUserByID = async (id) =>{
  try {
    const getUser = await User.findByPk(id)
    return getUser
  } catch (error) {
    console.log(error)
  }
}

module.exports = getUserByID;