const express = require("express");
const { detectUserIntent } = require("../controllers/chat");

const router = express.Router();

router.post("/", detectUserIntent);

module.exports = router;