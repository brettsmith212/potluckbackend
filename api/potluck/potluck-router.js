const router = require("express").Router();
const {
  addPotluck,
  allPotlucks,
  addGuest,
  allGuests,
} = require("./potluck-model");

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

router.get("/guests", (req, res) => {
  allGuests()
    .then((guests) => {
      res.status(200).json(guests);
    })
    .catch(() => {
      res.status(500).json({ message: "error getting guests" });
    });
});

router.post("/guests", (req, res) => {
  const guest = req.body;

  addGuest(guest)
    .then((newGuest) => {
      res.status(201).json(newGuest);
    })
    .catch(() => {
      res.status(500).json({ message: "error adding guest" });
    });
});

module.exports = router;
