const { Router } = require("express");
const { User, Cart, Favourite, Banner } = require("../db");
const createUser = require("../controllers/createUserController");
const { getUserDB } = require("../controllers/getUserDB");
const router = Router();
const getUserByID = require("../controllers/getUserByID");
const bcypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { authAdmins } = require("../middlewares/middleware");

const enviarMail = async (name, email, password) => {
  const config = {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "artketgalery@gmail.com",
      pass: "vvvicqjzjkocwjtd",
    },
    tls: {
      rejectUnauthorized: false,
    },
  };

  const mensaje = {
    from: '"Arket" <artketgalery@gmail.com>',
    to: email,
    subject: "Artket",
    text: `Hi ${name}! thank you for registering on our website! Remember, your password is ${password}`,
  };

  const transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje);
};

router.post("/findorcreate", async (req, res) => {
  const { email, name, lastname, password, dateBorn, role, idAuth } = req.body;

  const user = await User.findOne({ where: { idAuth } });

  // if (user.ban) res.status(401).json({ msg: "Not allowed" });
  // else {
  if (user && user.ban) res.status(401).json({ msg: "Not allowed" });
  else if (user) {
    const { name, cartId, favId, id, lastname, email, idAuth } =
      user.dataValues;
    res.status(200).json({ name, cartId, favId, id, lastname, email, idAuth });
  } else {
    const userCartId = await Cart.create().then(
      ({ dataValues }) => dataValues.id
    );

    const userFavId = await Favourite.create().then(
      ({ dataValues }) => dataValues.id
    );

    await User.create({
      name,
      lastname,
      email,
      password,
      dateBorn,
      role,
      cartId: userCartId,
      favId: userFavId,
      idAuth,
    });

    const user = await User.findOne({ where: { idAuth } });
    res.status(200).json(user.dataValues);
  }
  // }
});

router.post("/findLocalUser", async (req, res) => {
  const { email } = req.body;
  const passNoHashed = req.body.password;

  let userInCuestion = await User.findOne({ where: { email: email } });

  // if (userInCuestion.ban) res.status(401).json({ msg: "Not allowed" });
  // else {
  if (userInCuestion && userInCuestion.ban)
    res.status(401).json({ msg: "Not allowed" });
  else if (userInCuestion) {
    let hashSaved = userInCuestion.dataValues.password;

    let compare = bcypt.compareSync(passNoHashed, hashSaved);
    if (compare) {
      let a = userInCuestion.dataValues;
      return res.status(200).json(a);
    } else {
      res.status(400).send("contraseña incorrecta");
    }
  } else {
    res.status(400).send("el user no existe");
  }
  // }
});

router.post("/", async (req, res) => {
  const { name, lastname, email, dateBorn, role, headers } = req.body;
  const passNoHashed = req.body.password;
  let password = bcypt.hashSync(passNoHashed, 8);
  try {
    if (!headers) {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const cartId = await Cart.create().then(
          ({ dataValues }) => dataValues.id
        );
        const favId = await Favourite.create().then(
          ({ dataValues }) => dataValues.id
        );
        createUser(
          name,
          lastname,
          email,
          password,
          dateBorn,
          role,
          cartId,
          favId
        );
        try {
          enviarMail(name, email, passNoHashed);
        } catch (error) {
          console.log(error);
        }

        res.status(200).send("User created succesfully");
      } else {
        res.status(400).send("User allready exist");
      }
    } else {
      const userDb = await User.findOne({
        where: { email: headers.user.email },
      });
      if (!userDb) {
        const userCartId = await Cart.create().then(
          ({ dataValues }) => dataValues.id
        );
        const userFavId = await Favourite.create().then(
          ({ dataValues }) => dataValues.id
        );
        let arr = [];
        arr.push({
          name: headers.user.given_name,
          lastname: headers.user.family_name,
          email: headers.user.email,
          favId: userFavId,
          cartId: userCartId,
          idAuth: headers.user.sub,
        });
        await User.bulkCreate(arr);
        try {
          enviarMail(name, email, passNoHashed);
        } catch (error) {
          console.log(error);
        }
        res.status(200).send("User created succesfully");
      } else {
        res.status(400).send("User allready exists");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/", authAdmins, async (req, res) => {
  try {
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
    const userById = await User.findOne({ where: { id } });
    if (userById) {
      const { id, cartId,image, favId, name, lastname, email } = userById.dataValues;
      res.status(200).json({ id, cartId, image,  favId, name, lastname, email });
    } else {
      res.send("no se ha encontrado un usuario con ese id");
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { ban } = req.body;
    const user = User.update({ ban: !ban }, { where: { id } });
    res.status(200).send({ msg: "usuario banneado" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/update", async (req, res) => {
  try {
    const { email, name, image, lastname, id, idAuth } = req.body;

    const passNoHashed = req.body.password;
    let password = bcypt.hashSync(passNoHashed, 8);

    if (email.length) {
      User.update({ email }, { where: { id } });
    }
    if (name.length) {
      User.update({ name }, { where: { id } });
    }
    if (lastname.length) {
      User.update({ lastname }, { where: { id } });
    }
    if (image.length) {
      User.update({ image }, { where: { id } });
    }
    if (password.length) {
      User.update({ password }, { where: { id } });
    }
    res.status(200).send("se actualize paa");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
