const sessions = require("./../../models/sessions");
const awaitSessionsList = require("./../../models/awaitSessionsList");

const watchObject = require("watch-object");

const observeIncommingMessageOperator = (props) => {
  const { sessionId, cbRes } = props;
  // удаление из массива активных сессий в статусе await
  const index = awaitSessionsList.indexOf(sessionId);
  if (index > -1) {
    awaitSessionsList.splice(index, 1);
  }

  if (sessions[sessionId]) {
    const { watch, unwatch } = watchObject;
    watch(sessions[sessionId], (newVal) => {
      if (
        sessions[sessionId].status === newVal ||
        sessions[sessionId].messageToOperator === newVal
      ) {
        const resBody = {
          status: sessions[sessionId].status,
          messageToOperator: sessions[sessionId].messageToOperator,
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

module.exports = observeIncommingMessageOperator;
