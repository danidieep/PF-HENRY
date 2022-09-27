
const { Router } = require("express");
const { User, Cart } = require("../db");
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");
const router = Router();
const getUserByID = require("../controllers/getUserByID");
const bcypt = require("bcrypt")
const nodemailer = require("nodemailer")






const enviarMail = async (name,email,password)=>{
  const config = {
    host : "smtp.gmail.com",
    port:465,
    secure: true,
    auth : {
      user : "artketgalery@gmail.com",
      pass :"vvvicqjzjkocwjtd"
    },
    tls:{
      rejectUnauthorized:false
    }
  }

  const mensaje = {
    from : '"Arket" <artketgalery@gmail.com>',
    to:email,
    subject:"Artket",
    text: `Hi ${name}! thank you for registering on our website! Remember, your password is ${password}`
  }

  const transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje);
  console.log(info)
}




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
   const { email, name, lastname, password, dateBorn, role, idAuth } = req.body;
    
      const user = await User.findOne({where:{idAuth}})
      

      if (user) {
        const {name,cartId,id,lastname,email,idAuth} = user.dataValues
        res.status(200).json({name,cartId,id,lastname,email,idAuth});
      } else {

        
        const userCartId =  await Cart.create().then(
          ({ dataValues }) => dataValues.id
        );

        await User.create({name, lastname, email, password, dateBorn, role,cartId:userCartId,idAuth});

        const user = await User.findOne({where:{idAuth}})
         res.status(200).json(user.dataValues)

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
  const {email} = req.body;
  const passNoHashed = req.body.password
  
  let userInCuestion = await User.findOne({where:{email:email}})

 if(userInCuestion){
 let hashSaved = userInCuestion.dataValues.password
 
 let compare = bcypt.compareSync(passNoHashed,hashSaved)

if(compare){
  
  let a = userInCuestion.dataValues
  console.log(a)
  return res.status(200).json(a)
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
     

      

      const user = await User.findOne({where:{email}})

      if(!user){
        const cartId =  await Cart.create().then(
          ({ dataValues }) => dataValues.id
        );

        createUser(name, lastname, email, password, dateBorn, role, cartId);
      try {
        enviarMail(name,email, passNoHashed)
      } catch (error) {
        console.log(error)
      }
      
      res.status(200).send("User created succesfully");
    } else {

      res.status(400).send("User allready exist")
    }




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
        try {
          enviarMail(name,email, passNoHashed)
        } catch (error) {
          console.log(error)
        }
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
    const {email, name, lastname,id,idAuth} = req.body

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


