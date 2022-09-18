const { Router } = require("express");
const artRouter = require("./artRouter");
const artistRouter = require('./artistsRouter')
const userRouter = require('./userRouter')

const router = Router();

router.use("/artworks", artRouter);
router.use("/artists", artistRouter);
router.use("/user", userRouter)

module.exports = router;
