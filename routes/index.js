const router = require("express").Router();
const thoughtRouter = require("./api"); //export user and generalize

router.use("/api", thoughtRouter);

module.exports = router;
