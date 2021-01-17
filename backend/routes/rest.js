const express = require("express");
const router = express.Router();

// USER
router.get("/user/getId", (req, res) => {
  return res.status(200).send("suka");
});
// OPERATOR

module.exports = router;
