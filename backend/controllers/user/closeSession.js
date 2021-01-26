const sessions = require("./../../models/sessions");
let awaitSessionsList = require("./../../models/awaitSessionsList");

const closeSession = async (id) => {
  if (id in sessions) {
    const { status } = sessions[id];
    switch (status) {
      case "await":
        // удаление из массива активных сессий в статусе await
        const index = awaitSessionsList.indexOf(id);
        if (index > -1) {
          awaitSessionsList.splice(index, 1);
        }
        // удаление сессии из обьекта в статусе await
        await delete sessions[id];
        return "closeOnlyUser";
      case "active":
        return "closeUserAndOperator";
      default:
        return "pes suka mraz";
    }
  } else {
    return false;
  }
};

module.exports = closeSession;
