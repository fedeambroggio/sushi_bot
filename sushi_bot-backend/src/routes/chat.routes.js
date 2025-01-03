const express = require("express");
const { userInteraction } = require("../controllers/chat");

const router = express.Router();

router.post("/", userInteraction);

module.exports = router;