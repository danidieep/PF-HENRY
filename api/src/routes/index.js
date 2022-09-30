const { Router, application } = require("express");
const artRouter = require("./artRouter");
const artistRouter = require("./artistsRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const emailRouter = require("./emailRouter");
const authAdmins = require("../middlewares/middleware");
const favsRouter = require('./favouriteRouter')
// const authRouter = require('./authRouter')


const paymentRouter = require('./mercadopagoRouter')
const router = Router();




// router.use('/auth', authRouter)
router.use("/payments", paymentRouter)
router.use("/artworks", artRouter);
router.use("/artists", artistRouter);
router.use("/users", userRouter);
router.use("/favourites", favsRouter);
router.use("/cart", cartRouter);
router.use("/sendemail", emailRouter);

module.exports = router;
