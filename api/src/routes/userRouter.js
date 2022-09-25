const { Router } = require("express");
const { User, Cart } = require("../db");
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");
const router = Router();
const getUserByID = require("../controllers/getUserByID");
const bcypt = require("bcrypt")

// router.post("/", async (req, res) => {
//   const { name, lastname, email, password, dateBorn, role, headers } = req.body;
//   try {
//     if (!headers) {
//       const userCartId = await Cart.create().then(
//         ({ dataValues }) => dataValues.id
//       );
//       console.log(userCartId, 'userCartId');
//       createUser(name, lastname, email, password, dateBorn, role, userCartId);
//       res.status(200).send("User created succesfully");
//     } else {
//       const userDb = await User.findOne({
//         where: { email: headers.user.email },
//       });
//       if (!userDb) {
//         const userCartId = await Cart.create().then(
//           ({ dataValues }) => dataValues.id
//         );
//         let arr = [];
//         arr.push({
//           name: headers.user.given_name,
//           lastname: headers.user.family_name,
//           email: headers.user.email,
//           cartId: userCartId,
//           idAuth: headers.user.sub,
//         });
//         User.bulkCreate(arr);
//         res.status(200).send("User created succesfully");
//       } else {
//         res.status(400).send("User allready exists");
//       }
//     }
//     // const tokenAdmin = jwt.sign(
//     //   { name, lastname, email, password, dateBorn, role },
//     //   "secret_token"
//     // );
//   } catch (error) {
//     console.log(error);
//   }
// });
// // const creado = await User.findOne({where:name})
// // console.log(creado)
// // const tokenAdmin = jwt.sign(
// //   { name, lastname, email, password, dateBorn, role },
// //   "secret_token"
// // );
// //     res.status(200).send(user);
// //   } catch (error) {
// //     res.status(400).send(error.message);
// //   }
// // });

// // const ensureToken = (req, res, next) => {
// //   const { authorization } = req.headers;
// //   if (authorization === undefined) {
// //     res.status(403).send("not allowed");
// //   } else {
// //     req.token = authorization;
// //     next();
// //   }
// // };

 router.post("/findorcreate", async (req, res) => {
//   try {
//     // jwt.verify(req.token, "secret_token", (err, data) => {
//     //   if (err) {
//     //     res.status(403).send("Eroorororor");
//     //   } else {
//     //     res.send(data);
//     //   }
//     // });
   const { email, name, lastname, password, dateBorn, role } = req.body;
    const users = await getUserDB();

     
      const user = users.filter(
        (e) => e.email.toLowerCase() === email.toLowerCase()
      );

      if (user.length) {
        const {name,cartId,id,lastname,email} = user[0]
        res.status(200).json({name,cartId,id,lastname,email});
      } else {
        const userCartId =  await Cart.create().then(
          ({ dataValues }) => dataValues.id
        );
        await createUser(name, lastname, email, password, dateBorn, role,userCartId);

        const a = await getUserDB();

        const b = a.filter(
         (e) => e.email.toLowerCase() === email.toLowerCase()
        );
          res.status(200).json(b);

       }
      })
//     } else {
//       res.status(200).json(users);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
 
 router.post("/findLocalUser", async (req, res) => {
  //  jwt.verify(req.token, "secret_token", (err, data) => {
  //    if (err) {
  //       res.status(403).send("Eroorororor");
  //   } else {
  //      res.send(data);
  //  }
  //   });
  const { email} = req.body;
  const passNoHashed = req.body.password
  
  let userInCuestion = await User.findOne({where:{email}})

 if(userInCuestion){
 let hashSaved = userInCuestion.password
 let compare = bcypt.compareSync(passNoHashed,hashSaved)

if(compare){
  const {name, lastname,id,email,cartId} = userInCuestion.dataValues
  res.status(200).json({name,lastname,id,email,cartId})
}
else{
  res.status(400).send("contraseña incorrecta")
}
  }else{
    res.status(400).send("el user no existe")
  }
})

// router.get("/", async (req, res) => {
//   try {
//     const userById = await getUserDB();
//     res.send(userById);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userById = await getUserByID(id);
//     if (userById.length) {
//       res.send(userById);
//     }
//     res.send("no se ha encontrado un usuario con ese id");
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await User.destroy({ where: { id } });

//     res.status(200).send({ msg: "usuario eliminado" });
//   } catch (error) {
//     console.log(error);
//   }
// });

// module.exports = router;

router.post("/", async (req, res) => {
  const { name, lastname, email, dateBorn, role, headers } = req.body;
  const passNoHashed = req.body.password
  let password =  bcypt.hashSync(passNoHashed, 8)


  console.log(req.body);
  try {
    if (!headers) {
      const userCartId =  await Cart.create().then(
              ({ dataValues }) => dataValues.id
            );
      createUser(name, lastname, email, password, dateBorn, role, userCartId);
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
        await User.bulkCreate(arr);
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

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findOne({where:{id}});
    if (userById) {
      const {id,cartId,name,lastname,email} = userById.dataValues
      res.status(200).json({id,cartId,name,lastname,email})
    }
    else{res.send("no se ha encontrado un usuario con ese id");}
    
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


router.post("/update", async(req,res)=>{

  try {
    const {email, name, lastname,id} = req.body

    const passNoHashed = req.body.password 
    let password =  bcypt.hashSync(passNoHashed, 8)

    if(email.length){User.update({email},{where:{id}})}
    if(name.length){User.update({name},{where:{id}})}
    if(lastname.length){User.update({lastname},{where:{id}})}
    if(password.length){User.update({password},{where:{id}})}
    res.status(200).send("se actualize paa")
    
  } catch (error) {
    console.log(error)
  }
})







module.exports = router;

