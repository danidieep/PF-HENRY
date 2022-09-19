const { Router } = require("express");
const router = Router();
const getUsers = require("../controllers/userController");
const createUser = require("../controllers/userPostController");

router.get("/", async (req, res) => {
  try {
    const getUser = await getUsers();
    if (getUser.length === 0) res.send("Theres nobody");
    else res.send(getUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const postUser = await createUser(name);
    res.send("User created succesfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
