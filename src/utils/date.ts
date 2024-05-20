const currentDate = new Date();

const year = currentDate.getFullYear(); // 연도
const month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다.)
const day = currentDate.getDate(); // 일

export function getDate() {
  const curDate = `${year}-${month}-${day}`;
  return curDate;
}

export function getDateKorea() {
  const curDate = `${year}년 ${month}월 ${day}일`;
  return curDate;
}

export function setHourMinute(hour: number, minute: number) {
  return { hour, minute };
}
