const db = require("../data/db-config");

async function allPotlucks() {
  return await db("potluck");
}

async function allGuests() {
  return await db("guests");
}

async function allGuestsByPotluckId(potluck_id) {
  return await db("guests").where("potluck_id", potluck_id);
}

async function findPotluck(potluck_id) {
  return await db("potluck").where("potluck_id", potluck_id).first();
}

async function addPotluck(potluck) {
  const [newPotluck] = await db("potluck").insert(potluck, [
    "potluck_id",
    "date",
    "time",
    "location",
  ]);
  return newPotluck;
}

async function addGuest(guest) {
  const [newGuest] = await db("guests").insert(guest, [
    "guest_id",
    "guest_name",
    "potluck_id",
  ]);
  return newGuest;
}

async function addItem(item) {
  const [newItem] = await db("items").insert(item, [
    "item_id",
    "item_name",
    "guest_id",
  ]);
  return newItem;
}

module.exports = {
  allPotlucks,
  allGuests,
  allGuestsByPotluckId,
  findPotluck,
  addPotluck,
  addGuest,
  addItem,
};
