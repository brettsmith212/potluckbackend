const db = require("../data/db-config");

function findAll() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users").where("id", id).first();
}

async function add(user) {
  const [newUser] = await db("users").insert(user, ["user_id", "username"]);
  return newUser;
}

module.exports = {
  findAll,
  findBy,
  findById,
  add,
};
