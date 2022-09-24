const { Router } = require("express");
const { User, Cart } = require("../db");
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");
const router = Router();
const getUserByID = require("../controllers/getUserByID");

router.post("/", async (req, res) => {
  const { name, lastname, email, password, dateBorn, role, headers } = req.body;
  try {
    if (!headers) {
     
      await createUser(name, lastname, email, password, dateBorn);

      const userEnCuestion = await User.findOne({where:{email}})


       const userCartId = await Cart.create({id:userEnCuestion.dataValues.cartId})
       

      res.status(200).send("User created succesfully");
    } else {


      const userDb = await User.findOne({
        where: { email: headers.user.email },
      });
      if (!userDb) {
        const userCartId = await Cart.create().then( 
          ({ dataValues }) => dataValues.id
        );
        let arr = [];
        arr.push({
          name: headers.user.given_name,
          lastname: headers.user.family_name,
          email: headers.user.email,
          cartId: userCartId,
          idAuth: headers.user.sub,
        });
        console.log(arr);
        User.bulkCreate(arr);
        res.status(200).send("User created succesfully");
      } else {
        res.status(400).send("User allready exists");
      }
    }
    // const tokenAdmin = jwt.sign(
    //   { name, lastname, email, password, dateBorn, role },
    //   "secret_token"
    // );
  } catch (error) {
    console.log(error);
  }
});
// const creado = await User.findOne({where:name})
// console.log(creado)
// const tokenAdmin = jwt.sign(
//   { name, lastname, email, password, dateBorn, role },
//   "secret_token"
// );
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// const ensureToken = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (authorization === undefined) {
//     res.status(403).send("not allowed");
//   } else {
//     req.token = authorization;
//     next();
//   }
// };

router.post("/findorcreate", async (req, res) => {
  try {
    // jwt.verify(req.token, "secret_token", (err, data) => {
    //   if (err) {
    //     res.status(403).send("Eroorororor");
    //   } else {
    //     res.send(data);
    //   }
    // });
    const { email,name,lastname,password,dateBorn,role } = req.body;
    const users = await getUserDB();


    if (email) {
      const user = users.filter((e) =>
        e.email.toLowerCase()=== email.toLowerCase()
      );

      if (user.length) {
        res.status(200).json(user);
      } else {
      
        await createUser(name, lastname, email, password, dateBorn, role);
     

        const a = await getUserDB();

        const b = a.filter((e) =>
        e.email.toLowerCase()=== email.toLowerCase()
        );

        await Cart.create({id:b[0].cartId})

        if(user){
        res.status(200).json(b);
}

      }
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
   console.log(error);
  }
});

router.post("/findLocalUser", async (req, res) => {
  
    // jwt.verify(req.token, "secret_token", (err, data) => {
    //   if (err) {
    //     res.status(403).send("Eroorororor");
    //   } else {
    //     res.send(data);
    //   }
    // });
    const { email,password} = req.body;
    const users = await getUserDB();


    
      const user = users.filter((e) =>
        e.password.toLowerCase() === password.toLowerCase()
      );

      if (user.length) {
        res.status(200).json(user);
      } else {
      res.status(400).send("datos incorrectos")
}

    
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await getUserByID(id);
    if (userById.length) {
      res.send(userById);
    }
    res.send("no se ha encontrado un usuario con ese id");
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
   console.log(error);
  }
});

module.exports = router;
