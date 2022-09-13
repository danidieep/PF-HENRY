const { Router } = require("express");
const nftsRouter = require("./artRouter");

const router = Router();

router.use("/nfts", nftsRouter);

module.exports = router;
