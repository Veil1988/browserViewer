const sessions = require("./../models/sessions");
let awaitSessionsList = require("./../models/awaitSessionsList");

const closeSession = async (id) => {
  if (id in sessions) {
    const { status } = sessions[id];
    const index = awaitSessionsList.indexOf(id);
    console.log("status", status, sessions[id]);
    // if (userType === "user") {
    switch (status) {
      case "await":
        // удаление из массива активных сессий в статусе await
        if (index > -1) {
          awaitSessionsList.splice(index, 1);
        }
        await delete sessions[id];
        return "closeOnlyUser";
      case "active":
        sessions[id].status = "close";
        setTimeout(() => {
          if (index > -1) {
            awaitSessionsList.splice(index, 1);
          }
          delete sessions[id];
        }, 1000);

        return "closeUserAndOperator";
      default:
        return "pes suka mraz";
    }
  } else {
    return false;
  }
};

module.exports = closeSession;
