const { Router } = require("express");
const { User } = require("../db");
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");
var jwt = require("jsonwebtoken");

const getUsers = require("../controllers/userController");
const createUser = require("../controllers/userPostController");

const router = Router();

router.post("/", async (req, res) => {
  const { name, lastname, email, password, dateBorn, role } = req.body;
  try {
    const user = await createUser(
      name,
      lastname,
      email,
      password,
      dateBorn,
      role
    );
    if (role === true) {
      const tokenAdmin = jwt.sign(
        { name, lastname, email, password, dateBorn, role },
        "admin_token"
      );
      res.status(200).send("Admin created succesfully");
    } else res.status(200).send("User created succesfully");
  } catch (error) {
    res.status(400).send(error);
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.destroy({ where: { id } });

    res.status(200).send({ msg: "usuario eliminado" });
  } catch (error) {
    res.status(404).send(error);
  }
});

  //     const user = await createUser(
  //       name,
  //       lastname,
  //       email,
  //       password,
  //       dateBorn
      
  //     );

  //     res.status(200).send('usuario creado con exito')
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // router.get("/", async (req, res) => {
  //   try {

  //     const {name} = req.query
  //     const users = await getUserDB()

  //     if (name) {
  //       const user = users.filter(e => e.name.toLowerCase()?.includes(name.toLowerCase()))

  //       if(user){
  //          res.status(200).json(user)
  //       } else {
  //         res.status(404).send('este usuario no existe')
  //       }
       
  //     } else {
  //       res.status(200).json(users)
  //     }
  //   } catch (error) {
  //     res.status(404).send(error);
  //   }
  // });

  // router.delete("/:id", async (req, res) => {
  //   try {
  //     const { id } = req.params;

  //     const user = await User.destroy({ where: {id}})

  //       res.status(200).send({ msg: "usuario eliminado" });
      
  //   } catch (error) {
  //     res.status(404).send(error);
  //   }
  // })

  module.exports = router;