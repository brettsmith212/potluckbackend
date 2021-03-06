const db = require("../data/db-config");

async function allPotlucks() {
  return await db("potluck");
}

async function allGuests() {
  return await db("guests");
}

async function allItems() {
  return await db("items");
}

async function allGuestsByPotluckId(potluck_id) {
  return await db("guests").where("potluck_id", potluck_id);
}

async function findPotluck(potluck_id) {
  const result = await db("potluck as p")
    .leftJoin("guests as g", "g.potluck_id", "p.potluck_id")
    .leftJoin("items as i", "i.guest_id", "g.guest_id")
    .select("p.*", "g.*", "i.items_id", "i.item_name")
    .where("p.potluck_id", potluck_id)
    .orderBy("g.guest_name", "ASC");

  if (result.length === 0) {
    return null;
  }

  const potluck = {
    potluck_id: potluck_id,
    date: result[0].date,
    time: result[0].time,
    location: result[0].location,
    guests: [],
  };

  if (result[0].guest_id === null) {
    return potluck;
  }

  for (let guest of result) {
    potluck.guests.push({
      guest_id: guest.guest_id,
      guest_name: guest.guest_name,
      item_id: guest.item_id,
      item_name: guest.item_name,
    });
  }

  return potluck;
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

async function updatePotluck(potluck_id, changes) {
  return await db("potluck")
    .where({ potluck_id: potluck_id })
    .update(changes, ["potluck_id", "date", "time", "location"]);
}

async function deletePotluck(potluck_id) {
  return await db("potluck")
    .where({ potluck_id: potluck_id })
    .del(["potluck_id", "date", "time", "location"]);
}

async function addGuest(guest) {
  const [newGuest] = await db("guests").insert(guest, [
    "guest_id",
    "guest_name",
    "potluck_id",
  ]);
  return newGuest;
}

async function findGuest(guest_id) {
  const guest = await db("guests").where("guest_id", guest_id).first();
  return guest;
}

async function updateGuest(guest_id, changes) {
  return await db("guests")
    .where({ guest_id: guest_id })
    .update(changes, ["guest_id", "guest_name", "potluck_id"]);
}

async function deleteGuest(guest_id) {
  return await db("guests")
    .where({ guest_id: guest_id })
    .del(["guest_id", "guest_name", "potluck_id"]);
}

async function addItem(item) {
  const [newItem] = await db("items").insert(item, [
    "items_id",
    "item_name",
    "guest_id",
  ]);
  return newItem;
}

async function findItem(items_id) {
  const item = await db("items").where("items_id", items_id).first();
  return item;
}

async function updateItem(items_id, changes) {
  return await db("items")
    .where({ items_id: items_id })
    .update(changes, ["items_id", "item_name", "guest_id"]);
}

async function deleteItem(items_id) {
  return await db("items")
    .where({ items_id: items_id })
    .del(["items_id", "item_name", "guest_id"]);
}

async function findItemByGuestId(guest_id) {
  const item = await db("items").where("guest_id", guest_id).first();
  return item;
}

module.exports = {
  allPotlucks,
  allGuests,
  allItems,
  allGuestsByPotluckId,
  findPotluck,
  addPotluck,
  updatePotluck,
  deletePotluck,
  addGuest,
  findGuest,
  updateGuest,
  deleteGuest,
  addItem,
  findItem,
  updateItem,
  deleteItem,
  findItemByGuestId,
};
