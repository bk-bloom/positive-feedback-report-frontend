export function sortByName(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

export function getDay(date) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[new Date(date).getDay()];
}
