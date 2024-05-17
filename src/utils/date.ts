const currentDate = new Date();

const year = currentDate.getFullYear(); // 연도
const month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다.)
const day = currentDate.getDate(); // 일

export function getDate() {
  const curDate = `${year}-${month}-${day}`;
  return curDate;
}

export function setHourMinute(hour: number, minute: number) {
  const time = new Date(hour * 60 * 60 * 1000 + minute * 60 * 1000);
  return time;
}
