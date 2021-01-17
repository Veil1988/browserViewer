const express = require("express");
const router = express.Router();

const generateSessionId = require("./../controllers/user/getSessionId");

// USER
router.get("/user/getId", async (req, res) => {
  const id = await generateSessionId();
  if (id) {
    return res.status(200).send({ id });
  } else {
    return res.status(400).send({ typeError: "No generated ID" });
  }
});
// OPERATOR

module.exports = router;
