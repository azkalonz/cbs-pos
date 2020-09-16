export function dateToUNIX(date) {
  if (!date?.getTime) return 0;
  return parseInt((date.getTime() / 1000).toFixed(0));
}
export function UNIXtoDate(UNIX_timestamp) {
  if (!UNIX_timestamp) return new Date();
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return new Date(time);
}
export default new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "PHP",
});
