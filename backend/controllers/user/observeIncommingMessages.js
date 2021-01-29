const sessions = require("./../../models/sessions");

const watchObject = require("watch-object");

const observeIncommingMessage = (props) => {
  const { sessionId, cbRes } = props;
  if (sessions[sessionId]) {
    const { watch, unwatch } = watchObject;
    watch(sessions[sessionId], (newVal) => {
      if (
        sessions[sessionId].status === newVal ||
        sessions[sessionId].messageToUser === newVal
      ) {
        const resBody = {
          status: sessions[sessionId].status,
          messageToUser: sessions[sessionId].messageToUser,
        };
        const resBodyJson = JSON.stringify(resBody);
        cbRes.status(200).write(`data: ${resBodyJson}\n\n`);
      }
      if (newVal === "close") {
        unwatch(sessions[sessionId]);
      }
    });
  }
};

module.exports = observeIncommingMessage;
