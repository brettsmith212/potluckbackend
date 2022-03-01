const router = require("express").Router();
const { addPotluck, allPotlucks } = require("./potluck-model");

router.get("/", (req, res) => {
  allPotlucks()
    .then((potlucks) => {
      res.status(200).json(potlucks);
    })
    .catch(() => {
      res.status(500).json({ message: "error getting potlucks" });
    });
});

router.post("/", (req, res) => {
  const potluck = req.body;

  addPotluck(potluck)
    .then((newPotluck) => {
      res.status(201).json(newPotluck);
    })
    .catch(() => {
      res.status(500).json({ message: "error adding potluck" });
    });
});

module.exports = router;
