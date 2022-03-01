const router = require("express").Router();
const {
  addPotluck,
  allPotlucks,
  addGuest,
  allGuests,
  allItems,
  addItem,
  findPotluck,
} = require("./potluck-model");
const restricted = require("../auth/restricted");
const {
  potluckIdExists,
  checkPotluck,
  checkGuest,
  checkItem,
} = require("./potluck-middleware");

router.get("/potluck", restricted, (req, res) => {
  allPotlucks()
    .then((potlucks) => {
      res.status(200).json(potlucks);
    })
    .catch(() => {
      res.status(500).json({ message: "error getting potlucks" });
    });
});

router.get("/potluck/:id", restricted, potluckIdExists, (req, res) => {
  findPotluck(req.params.id)
    .then((potluck) => {
      res.status(200).json(potluck);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: `error getting potluck ${req.params.id}` });
    });
});

router.post("/potluck", restricted, checkPotluck, (req, res) => {
  const potluck = req.body;

  addPotluck(potluck)
    .then((newPotluck) => {
      res.status(201).json(newPotluck);
    })
    .catch(() => {
      res.status(500).json({ message: "error adding potluck" });
    });
});

router.get("/guests", restricted, (req, res) => {
  console.log("Guests");
  allGuests()
    .then((guests) => {
      res.status(200).json(guests);
    })
    .catch(() => {
      res.status(500).json({ message: "error getting guests" });
    });
});

router.post("/guests", restricted, checkGuest, (req, res) => {
  const guest = req.body;

  addGuest(guest)
    .then((newGuest) => {
      res.status(201).json(newGuest);
    })
    .catch(() => {
      res.status(500).json({ message: "error adding guest" });
    });
});

router.get("/items", restricted, (req, res) => {
  allItems()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch(() => {
      res.status(500).json({ message: "error getting items" });
    });
});

router.post("/items", restricted, checkItem, (req, res) => {
  const item = req.body;

  addItem(item)
    .then((newItem) => {
      res.status(201).json(newItem);
    })
    .catch(() => {
      res.status(500).json({ message: "error adding item" });
    });
});

module.exports = router;
