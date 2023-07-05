// 切り捨て
function truncateFloat(number, decimals) {
  var factor = Math.pow(10, decimals);
  var truncatedNumber = Math.floor(number * factor) / factor;
  return truncatedNumber;
}
// 四捨五入
function roundFloat(number, decimals) {
  var factor = Math.pow(10, decimals);
  var roundedNumber = Math.round(number * factor) / factor;
  return roundedNumber;
}
