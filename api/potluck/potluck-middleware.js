const {
  findPotluck,
  findGuest,
  findItemByGuestId,
  findItem,
} = require("./potluck-model");

const checkGuestId = async (id) => {
  const guest = await findGuest(id);
  if (guest) {
    return guest;
  } else {
    return false;
  }
};

const potluckIdExists = async (req, res, next) => {
  const result = await findPotluck(req.params.id);
  if (!result) {
    res
      .status(400)
      .json({ message: `Potluck ID ${req.params.id} does not exist` });
    return;
  } else {
    next();
  }
};

const guestIdExists = async (req, res, next) => {
  const result = await findGuest(req.params.id);
  if (!result) {
    res
      .status(400)
      .json({ message: `Guest ID ${req.params.id} does not exist` });
    return;
  } else {
    next();
  }
};

const itemIdExists = async (req, res, next) => {
  const result = await findItem(req.params.id);
  if (!result) {
    res
      .status(400)
      .json({ message: `Item ID ${req.params.id} does not exist` });
    return;
  } else {
    next();
  }
};

const checkPotluck = (req, res, next) => {
  const { date, time, location } = req.body;
  if (!date || !time || !location) {
    res.status(400).json({ message: "date, time and location are required" });
    return;
  } else {
    next();
  }
};

const checkUpdatingPotluck = (req, res, next) => {
  let keys = Object.keys(req.body);
  let badKeys = keys.filter((key) => {
    switch (key) {
      case "date":
        break;
      case "time":
        break;
      case "location":
        break;
      default:
        return key;
    }
  });

  if (badKeys.length > 0) {
    res.status(400).json("Valid fields are date, time, or location");
  } else {
    next();
  }
};

const checkUpdatingGuest = (req, res, next) => {
  let keys = Object.keys(req.body);
  let badKeys = keys.filter((key) => {
    switch (key) {
      case "guest_name":
        break;
      case "potluck_id":
        break;
      default:
        return key;
    }
  });

  if (badKeys.length > 0) {
    res.status(400).json("Valid fields are guest_name or potluck_id");
  } else {
    next();
  }
};

const checkUpdatingItem = (req, res, next) => {
  let keys = Object.keys(req.body);
  let badKeys = keys.filter((key) => {
    switch (key) {
      case "item_name":
        break;
      case "guest_id":
        break;
      default:
        return key;
    }
  });

  if (badKeys.length > 0) {
    res.status(400).json("Valid fields are item_name or guest_id");
  } else {
    next();
  }
};

const checkGuest = async (req, res, next) => {
  const { guest_name, potluck_id } = req.body;
  if (!guest_name || !potluck_id) {
    res.status(400).json({ message: "guest_name and potluck_id are required" });
    return;
  } else if (typeof guest_name !== "string") {
    res.status(400).json({ message: "guest_name must be a string" });
  }

  // Checks if potluck_id exists
  const idExists = await findPotluck(potluck_id);
  if (!idExists) {
    res.status(400).json({ message: "please enter a valid potluck_id" });
    return;
  } else {
    next();
  }
};

const checkItem = async (req, res, next) => {
  const { item_name, guest_id } = req.body;
  if (!item_name || !guest_id) {
    res.status(400).json({ message: "item_name and guest_id are required" });
    return;
  }

  // Checks if guest_id exists
  const guest = await checkGuestId(guest_id);
  if (!guest) {
    res.status(400).json({ message: "please enter a valid guest_id" });
    return;
  }

  // Checks if guest is already bringing something
  const item = await findItemByGuestId(guest_id);
  if (item) {
    res.status(400).json({
      message: `${guest.guest_name} is already bringing something (${item.item_name})`,
    });
    return;
  } else {
    next();
  }
};

module.exports = {
  potluckIdExists,
  checkPotluck,
  checkUpdatingPotluck,
  checkUpdatingGuest,
  checkUpdatingItem,
  checkGuest,
  checkItem,
  guestIdExists,
  itemIdExists,
};
