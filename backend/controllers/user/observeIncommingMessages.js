const sessions = require("./../../models/sessions");

const watchObject = require("watch-object");

const observeIncommingMessage = (props) => {
  const { sessionCode, cbRes } = props;
  if (sessions[sessionCode]) {
    const { watch, unwatch } = watchObject;
    watch(sessions[sessionCode], () => {
      // todo обработчик завершения сессии
      const resBody = {
        status: sessions[sessionCode].status,
        messageToUser: sessions[sessionCode].messageToUser,
      };
      const resBodyJson = JSON.stringify(resBody);
      cbRes.status(200).write(`data: ${resBodyJson}\n\n`);
    });
    sessions[sessionCode].status = "suka";
    setTimeout(() => (sessions[sessionCode].messageToUser = "pes"), 5000);
  }
};

module.exports = observeIncommingMessage;
