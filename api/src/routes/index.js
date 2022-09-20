const { Router } = require("express");
const artRouter = require("./artRouter");
const artistRouter = require("./artistsRouter");
const userRouter = require("./userRouter");
const favsRouter = require('./favAddRouter')

const router = Router();

router.use("/artworks", artRouter);
router.use("/artists", artistRouter);
router.use("/users", userRouter);
router.use("/favourites", favsRouter);


router.use("/user", userRouter)

router.use("/users", userRouter);
router.use("/favourites", favsRouter);



module.exports = router;
