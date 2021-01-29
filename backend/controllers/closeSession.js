const sessions = require("./../models/sessions");
let awaitSessionsList = require("./../models/awaitSessionsList");

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
        await delete sessions[id];
        return "closeOnlyUser";
      case "active":
        
        // хз корректно или нет
        await delete sessions[id];
        return "closeUserAndOperator";
      default:
        return "pes suka mraz";
    }
  } else {
    return false;
  }
};

module.exports = closeSession;
