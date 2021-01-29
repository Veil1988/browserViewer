const { request } = require("express");
const express = require("express");
const router = express.Router();

const closeSession = require("./../controllers/closeSession");

// USER CONTROLLERS
const generateSessionId = require("./../controllers/user/getSessionId");
const observeIncommingMessageUser = require("./../controllers/user/observeIncommingMessageUser");

// OPERATOR CONTROLLERS
const observeAwaitSession = require("./../controllers/operator/observeAwaitSession");
const observeIncommingMessageOperator = require("./../controllers/operator/observeIncommingMessageOperator");
const setMessageToUser = require("./../controllers/operator/setMessageToUser");

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

router.get("/user/userEventSource/:sessionId", async (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  const sessionId = req.params.sessionId.split("=")[1];
  observeIncommingMessageUser({ sessionId, cbRes: res });
});

// OPERATOR
// TODO нету базы открывается тапком
router.post("/operator/auth", async (req, res) => {
  const { body: bodyJSON } = req;
  const body = await JSON.parse(bodyJSON);

  res.status(200).send({ isAuthonticadesOperator: true });
});

router.get("/operator/getSessionListEventSource", async (req, res) => {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  observeAwaitSession({ cbRes: res });
});

router.get(
  "/operator/connectToUserEventSource/:sessionId",
  async (req, res) => {
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();

    const sessionId = req.params.sessionId.split("=")[1];

    if (sessionId) {
      observeIncommingMessageOperator({ sessionId, cbRes: res });
    }
  }
);

router.post("/operator/sessionMessage", async (req, res) => {
  const { body: bodyJSON } = req;
  const body = await JSON.parse(bodyJSON);
  setMessageToUser({ ...body, cbRes: res });
});

module.exports = router;
