const { Router } = require("express");
const { User } = require("../db")
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");

const router = Router();

router.post("/", async (req, res) => {
     const { name, lastname ,email, password, dateBorn} = req.body
    try {
     
    // const user = await Users.create({
    //     name,
    //     lastName,
    //     email,
    //     password,
    //     dateBorn,
    //   })

      const user = await createUser(
        name,
        lastname,
        email,
        password,
        dateBorn
      
      );

      res.status(200).send('usuario creado con exito')
    } catch (error) {
      console.log(error);
    }
  });

  router.get("/", async (req, res) => {
    try {

      const {name} = req.query
      const users = await getUserDB()

      if (name) {
        const user = users.filter(e => e.name.toLowerCase()?.includes(name.toLowerCase()))

        if(user){
           res.status(200).json(user)
        } else {
          res.status(404).send('este usuario no existe')
        }
       
      } else {
        res.status(200).json(users)
      }
    } catch (error) {
      res.status(404).send(error);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.destroy({ where: {id}})

        res.status(200).send({ msg: "usuario eliminado" });
      
    } catch (error) {
      res.status(404).send(error);
    }
  })

  module.exports = router;