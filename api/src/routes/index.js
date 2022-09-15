const { Router } = require("express");
const artRouter = require("./artRouter");
const artistRouter = require('./artistsRouter')

const router = Router();

router.use("/artworks", artRouter);
router.use("/artists", artistRouter);


module.exports = router;
