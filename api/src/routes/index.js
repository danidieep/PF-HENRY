const { Router } = require("express");
const artRouter = require("./artRouter");

const router = Router();

router.use("/artworks", artRouter);

module.exports = router;
