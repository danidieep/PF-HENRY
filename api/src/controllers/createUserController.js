const { Op } = require("sequelize");
const { User } = require("../db")


const createUser = async (
         name,
         lastname,
         email,
         password,
         dateBorn,
  ) => {
    const userCreate = await User.create({
        name,
        lastname,
        email,
        password,
        dateBorn,
    });

}

    module.exports = createUser;