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
  await db("users").insert(user);
  return user;
}

module.exports = {
  findAll,
  findBy,
  findById,
  add,
};
