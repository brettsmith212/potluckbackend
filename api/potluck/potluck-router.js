const router = require("express").Router();
const {
  addPotluck,
  allPotlucks,
  addGuest,
  allGuests,
  allItems,
  addItem,
  findPotluck,
  deletePotluck,
  deleteGuest,
  deleteItem,
  updatePotluck,
  updateGuest,
  updateItem,
} = require("./potluck-model");
const restricted = require("../auth/restricted");
const {
  potluckIdExists,
  checkPotluck,
  checkGuest,
  checkItem,
  guestIdExists,
  itemIdExists,
  checkUpdatingPotluck,
  checkUpdatingGuest,
  checkUpdatingItem,
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

router.put(
  "/potluck/:id",
  restricted,
  potluckIdExists,
  checkUpdatingPotluck,
  (req, res) => {
    const changes = req.body;

    updatePotluck(req.params.id, changes)
      .then((updatedPotluck) => {
        res.status(201).json(updatedPotluck);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: `error updating potluck ID ${req.params.id}` });
      });
  }
);

router.delete("/potluck/:id", restricted, potluckIdExists, (req, res) => {
  deletePotluck(req.params.id)
    .then((deletedPotluck) => {
      res.status(200).json(deletedPotluck);
    })
    .catch(() => {
      res.status(500).json({ message: "error deleting potluck" });
    });
});

router.get("/guests", restricted, (req, res) => {
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

router.put(
  "/guests/:id",
  restricted,
  guestIdExists,
  checkUpdatingGuest,
  (req, res) => {
    const changes = req.body;

    updateGuest(req.params.id, changes)
      .then((updatedGuest) => {
        res.status(201).json(updatedGuest);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: `error updating guest ID ${req.params.id}` });
      });
  }
);

router.delete("/guests/:id", restricted, guestIdExists, (req, res) => {
  deleteGuest(req.params.id)
    .then((deletedGuest) => {
      res.status(200).json(deletedGuest);
    })
    .catch(() => {
      res.status(500).json({ message: "error deleting guest" });
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

router.put(
  "/items/:id",
  restricted,
  itemIdExists,
  checkUpdatingItem,
  (req, res) => {
    const changes = req.body;

    updateItem(req.params.id, changes)
      .then((updatedItem) => {
        res.status(201).json(updatedItem);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: `error updating item ID ${req.params.id}` });
      });
  }
);

router.delete("/items/:id", restricted, itemIdExists, (req, res) => {
  deleteItem(req.params.id)
    .then((deletedItem) => {
      res.status(200).json(deletedItem);
    })
    .catch(() => {
      res.status(500).json({ message: "error deleting item" });
    });
});

module.exports = router;
