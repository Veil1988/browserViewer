const awaitSessionsList = require("./../../models/awaitSessionsList");

const watchObject = require("watch-object");

const observeAwaitSession = async (props) => {
  const { cbRes } = props;

  cbRes.status(200).write(`data: ${awaitSessionsList}\n\n`);
  if (awaitSessionsList) {
    const { watch, unwatch } = watchObject;
    watch(awaitSessionsList, (newVal, oldVal) => {
      console.log("---", newVal);
      cbRes.status(200).write(`data: ${newVal}\n\n`);
    });
  }
};

module.exports = observeAwaitSession;
