const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const AuthRouter = require("./auth/auth-router");
const PotluckRouter = require("./potluck/potluck-router");

// async function insertUser(user) {
//   // WITH POSTGRES WE CAN PASS A "RETURNING ARRAY" AS 2ND ARGUMENT TO knex.insert/update
//   // AND OBTAIN WHATEVER COLUMNS WE NEED FROM THE NEWLY CREATED/UPDATED RECORD
//   const [newUserObject] = await db("users").insert(user, [
//     "user_id",
//     "username",
//     "password",
//   ]);
//   return newUserObject; // { user_id: 7, username: 'foo', password: 'xxxxxxx' }
// }

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/auth", AuthRouter);
server.use("/api/potluck", PotluckRouter);

module.exports = server;
