const { Router, application } = require("express");
const artRouter = require("./artRouter");
const artistRouter = require("./artistsRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const emailRouter = require("./emailRouter");
const authAdmins = require("../middlewares/middleware");
const favsRouter = require('./favouriteRouter')
const adressRouter = require('./adressRouter')
const mercadopagoRouter = require('./mercadopagoRouter')
const router = Router();




router.use("/payment", mercadopagoRouter)
router.use("/artworks", artRouter);
router.use("/artists", artistRouter);
router.use("/users", userRouter);
router.use("/favourites", favsRouter);
router.use("/cart", cartRouter);
router.use("/sendemail", emailRouter);
router.use('/adresses', adressRouter)

module.exports = router;
