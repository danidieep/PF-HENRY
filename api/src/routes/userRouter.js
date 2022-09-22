const { Router } = require("express");
const { User, Cart } = require("../db")
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");

const router = Router();

router.post("/", async (req, res) => {
  const { name, lastname, email, password, dateBorn, role } = req.body;
  // let verify = User.findOne({where:email})
  //   if(verify.length) return res.send('ya hay un usuario con ese email')

  try {
    const userCartId = await Cart.create().then(
      ({dataValues}) => dataValues.id
    )
    // console.log(userCartId)
    const user = await User.findOrCreate({
      where:{
      cartId: userCartId,
      name,
      lastname,
      email,
      password,
      role
      }
    }
  )
    // const creado = await User.findOne({where:name})
    // console.log(creado)
    // const tokenAdmin = jwt.sign(
    //   { name, lastname, email, password, dateBorn, role },
    //   "secret_token"
    // );
    res.status(200).send(user);
  } catch (error) {
   console.log(error)
  }
});

  router.get("/", async (req, res) => {
    try {

      const {email} = req.query
      const users = await getUserDB()

      if (email) {
        const user = users.filter(e => e.email.toLowerCase()?.includes(email.toLowerCase()))

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