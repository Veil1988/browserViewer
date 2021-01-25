const sessions = require("./../../models/sessions");

const watchObject = require("watch-object");

const getFiltredSession = (sessionObj) => {
  const sessionKeys = Object.keys(sessionObj);
  const filtredSession = sessionKeys.filter((key) => {
    return sessionObj[key].status === "await";
  });

  return JSON.stringify(filtredSession);
};

const observeAwaitSession = async (props) => {
  const { cbRes } = props;
  let resBodyJson = await getFiltredSession(sessions);

  cbRes.status(200).write(`data: ${resBodyJson}\n\n`);
  console.log("sessions", sessions);
  if (sessions) {
    const { watch, unwatch } = watchObject;
    watch(sessions, (newVal, oldVal) => {
      console.log("3131", newVal);
    });
  }
};

module.exports = observeAwaitSession;
