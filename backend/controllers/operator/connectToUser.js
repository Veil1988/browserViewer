const sessions = require("./../../models/sessions");
const awaitSessionsList = require("./../../models/awaitSessionsList");

const connectToUser = (props) => {
  const { sessionId, cbRes } = props;
  // удаление из массива активных сессий в статусе await
  console.log("---", sessionId);
  const index = awaitSessionsList.indexOf(sessionId);
  if (index > -1) {
    awaitSessionsList.splice(index, 1);
  }
};

module.exports = connectToUser;
