const { request } = require("express");
const express = require("express");
const router = express.Router();

const generateSessionId = require("./../controllers/user/getSessionId");
const closeSession = require("./../controllers/user/closeSession");

// USER
router.get("/user/getSessionId", async (req, res) => {
  const sessionId = await generateSessionId();
  if (sessionId) {
    res.status(200).send({ sessionId });
  } else {
    res.status(400).send({ error: "No generated ID" });
  }
});

router.post("/user/closeSession", async (req, res) => {
  const { body: bodyJSON } = req;
  const body = await JSON.parse(bodyJSON);
  if ("sessionId" in body && body.sessionId) {
    const { sessionId } = body;
    const status = await closeSession(sessionId);
    console.log("status", status);
    switch (status) {
      case "closeOnlyUser":
        res.status(200).send({ message: "Session closed" });
        break;
      // TODO
      case "closeUserAndOperator":
        break;
      default:
        res.status(400).send({ error: "Server Error" });
        break;
    }
  } else {
    res.status(400).send({ error: "Request Error" });
  }
});

// OPERATOR

module.exports = router;
