const getDate = function () {
  const today = new Date();
  const option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return today.toLocaleDateString("en-US", option);
};

const getDay = function () {
  const today = new Date();
  const option = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", option);
};

exports.day = { getDate, getDay };
