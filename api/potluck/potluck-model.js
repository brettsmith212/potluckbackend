const db = require("../data/db-config");

async function allPotlucks() {
  return await db("potluck");
}

async function findPotluck(potluck_id) {
  return await db("potluck").where("potluck_id", potluck_id).first();
}

async function addPotluck(potluck) {
  let [newPotluck] = await db("potluck").insert(potluck, [
    "potluck_id",
    "date",
    "time",
    "location",
  ]);
  return newPotluck;
}

module.exports = {
  allPotlucks,
  findPotluck,
  addPotluck,
};
