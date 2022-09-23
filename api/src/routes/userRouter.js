const { Router } = require("express");
const { User, Cart } = require("../db");
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");
var jwt = require("jsonwebtoken");
const router = Router();
const  getUserByID = require("../controllers/getUserByID");
// const {Cart} = require("../db");


router.post("/", async (req, res) => {
  const { name, lastname, email, password, dateBorn, role } = req.body;
  try {
    // let verify = User.findOne({where:email})
    // if(verify.length) res.send('ya hay un usuario con ese email')
    const userCartId = await Cart.create().then(
      ({dataValues}) => dataValues.id
    )
    // console.log(userCartId)
    const user = await User.findOrCreate({
      where:{
      email,  
      cartId: userCartId,
      name,
      lastname,
      password,
      role
      }
    }
  )
  console.log(user);
    // const creado = await User.findOne({where:name})
    // console.log(creado)
    // const tokenAdmin = jwt.sign(
    //   { name, lastname, email, password, dateBorn, role },
    //   "secret_token"
    // );
    res.status(200).send(user);
  } catch (error) {
      res.status(400).send(error)
  }
});

// const ensureToken = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (authorization === undefined) {
//     res.status(403).send("not allowed");
//   } else {
//     req.token = authorization;
//     next();
//   }
// };

router.get("/", async (req, res) => {
  try {
    // jwt.verify(req.token, "secret_token", (err, data) => {
    //   if (err) {
    //     res.status(403).send("Eroorororor");
    //   } else {
    //     res.send(data);
    //   }
    // });
    const { name } = req.query;
    const users = await getUserDB();

    if (name) {
      const user = users.filter((e) =>
        e.name.toLowerCase()?.includes(name.toLowerCase())
      );

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("este usuario no existe");
      }
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});


router.get('/:id', async (req, res) =>{
  try {
    const {id} = req.params
    const userById = await getUserByID(id)
    if(userById.length){
      res.send(userById)
    }
    res.send('no se ha encontrado un usuario con ese id')
  } catch (error) {
    res.status(404).send(error);
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({ where: { id } });

    res.status(200).send({ msg: "usuario eliminado" });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
