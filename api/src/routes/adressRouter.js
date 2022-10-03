const router = require("express").Router();
const { Adress } = require("../db");

router.get("/", async (req, res) => {
  const { email } = req.headers;
  console.log(email, "email req.headers");
  const adresses = await Adress.findOne({ where: { email } });
  res.status(200).send(adresses);
});

router.post("/", async (req, res) => {
  const { payload, email } = req.body;
  Adress.findOrCreate({
    where: { email },
    defaults: {
      street: payload.street,
      number: payload.number,
      postalCode: payload.postalCode,
    },
  });
  res.status(200).send("Adress");
});

module.exports = router;
