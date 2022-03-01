const {
  findPotluck,
  findGuest,
  findItemByGuestId,
} = require("./potluck-model");

const guestIdExists = async (id) => {
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

const checkPotluck = (req, res, next) => {
  const { date, time, location } = req.body;
  if (!date || !time || !location) {
    res.status(400).json({ message: "date, time and location are required" });
    return;
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
  const guest = await guestIdExists(guest_id);
  console.log(guest);
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
  checkGuest,
  checkItem,
};
