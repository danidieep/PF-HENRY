const { User } = require("../db")

const getUserDB = async () => {
  const users = await User.findAll()
  
  const info = users.map(u => {
    return {
        id: u.id,
        name: u.name,
        lastname: u.lastname,
        email: u.email,
        dateBorn: u.dateBorn,
        password: u.password
    }
  })

  return info
}

module.exports = {getUserDB}