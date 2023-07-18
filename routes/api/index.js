const router = require("express").Router();
const thoughtRouter = require("./thought-routes");
const userRouter = require("./user-routes");

router.use("/thought", thoughtRouter);
router.use("/user", userRouter);

module.exports = router;
