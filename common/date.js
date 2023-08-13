exports.initDate = function (date) {
  date = new Date(date);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setDate(date.getDate() + 1);
  return date;
}
