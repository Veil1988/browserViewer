const sessions = require("./../../models/sessions");

const watchObject = require("watch-object");

const observeIncommingMessage = (props) => {
  const { sessionCode, cbRes } = props;
  if (sessions[sessionCode]) {
    const { watch, unwatch } = watchObject;
    watch(sessions[sessionCode], (newVal) => {
      if (
        sessions[sessionCode].status === newVal ||
        sessions[sessionCode].messageToUser === newVal
      ) {
        const resBody = {
          status: sessions[sessionCode].status,
          messageToUser: sessions[sessionCode].messageToUser,
        };
        const resBodyJson = JSON.stringify(resBody);
        cbRes.status(200).write(`data: ${resBodyJson}\n\n`);
      }
      if (newVal === "close") {
        unwatch(sessions[sessionCode]);
      }
    });
  }
};

module.exports = observeIncommingMessage;
