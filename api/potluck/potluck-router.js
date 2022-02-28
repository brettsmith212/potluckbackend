const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ message: "getting potluck info" });
});

module.exports = router;
