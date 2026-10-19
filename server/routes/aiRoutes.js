const express = require("express");
const { generateAIGuide } = require("../controllers/aiGuideController");

const router = express.Router();

router.post("/guide", generateAIGuide);

module.exports = router;
