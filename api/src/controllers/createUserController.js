const { User } = require("../db")


const createUser = async (
         name,
         lastname,
         email,
         password,
         dateBorn,
         role
  ) => {
    const userCreate = await User.create({
        name,
        lastname,
        email,
        password,
        dateBorn,
        role
    });

}

    module.exports = createUser;