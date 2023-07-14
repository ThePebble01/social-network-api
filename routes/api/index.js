const router = require("express").Router();
const thoughtRouter = require("./thought-routes");

router.use("/thought", thoughtRouter);

module.exports = router;
