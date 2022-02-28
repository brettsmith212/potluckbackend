const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, BCRYPT_ROUNDS } = require("../secret");
const { add, findAll, findBy } = require("../users/users-model");
const { usernameExists, validateLogin } = require("./auth-middleware");
const restricted = require("./restricted");

router.get("/", restricted, async (req, res) => {
  let allUsers = await findAll();
  if (allUsers) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({ message: "error finding users" });
  }
});

router.post("/register", usernameExists, validateLogin, (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS);
  user.password = hash;

  add(user)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(() => {
      res.status(500).json({ message: "error adding new user" });
    });
});

router.post("/login", validateLogin, (req, res) => {
  const { username, password } = req.body;

  findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `welcome, ${user.username}`, token });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error logging in" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

module.exports = router;
