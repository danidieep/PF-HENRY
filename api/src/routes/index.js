const { Router, application } = require("express");
const artRouter = require("./artRouter");
const artistRouter = require("./artistsRouter");
const userRouter = require("./userRouter");
const favsRouter = require('./favAddRouter')
// const authRouter = require('./authRouter')
// console.log(authRouter)
const router = Router();



// router.use('/auth', authRouter)
router.use("/artworks", artRouter);
router.use("/artists", artistRouter);
router.use("/users", userRouter);
router.use("/favourites", favsRouter);

<<<<<<< HEAD

router.use("/user", userRouter)

router.use("/users", userRouter);
router.use("/favourites", favsRouter);



=======
>>>>>>> 3f7dbeadc2bbf365021c0fc4ad3d668f681a65d0
module.exports = router;
