let awaitSessionsList = require("./../../models/awaitSessionsList");

const watchObject = require("watch-object");

const observeAwaitSession = (props) => {
  const { cbRes } = props;
  const { watch, unwatch } = watchObject;
  const resBodyJson = JSON.stringify(awaitSessionsList);

  watch(awaitSessionsList, (newVal, oldVal) => {
    const newResBodyJson = JSON.stringify(awaitSessionsList);
    cbRes.status(200).write(`data: ${newResBodyJson}\n\n`);
  });
  cbRes.status(200).write(`data: ${resBodyJson}\n\n`);
};

module.exports = observeAwaitSession;
