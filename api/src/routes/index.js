const { Router, application } = require("express");
const artRouter = require("./artRouter");
const artistRouter = require("./artistsRouter");
const userRouter = require("./userRouter");
const favsRouter = require('./favAddRouter')
// const authRouter = require('./authRouter')
const cartRouter = require('./cartRouter')
const emailRouter = require('./emailRouter')
// console.log(authRouter)
const router = Router();



// router.use('/auth', authRouter)
router.use("/artworks", artRouter);
router.use("/artists", artistRouter);
router.use("/users", userRouter);
router.use("/favourites", favsRouter);
router.use('/cart', cartRouter)
router.use('/sendemail', emailRouter)

module.exports = router;