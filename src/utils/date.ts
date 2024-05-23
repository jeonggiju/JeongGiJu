const currentDate = new Date();

const year = currentDate.getFullYear(); // 연도
const month = currentDate.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다.)
const day = currentDate.getDate(); // 일

export function dateToString(date: Date) {
  const year = date.getFullYear(); // 연도
  const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줍니다.)
  const day = date.getDate(); // 일
  return `${year}-${month}-${day}`;
}
export function getTodayDate() {
  const curDate = `${year}-${month}-${day}`;
  return curDate;
}

export function getTodayDateKorea() {
  const curDate = `${year}년 ${month}월 ${day}일`;
  return curDate;
}

export function setHourMinute(hour: number, minute: number) {
  return { hour, minute };
}

export function getDateMonthDay(date: Date): string {
  const data = `${date.getMonth() + 1}/${date.getDate()}`;
  return data;
}

export function getTime({
  hour,
  minute,
}: {
  hour: number;
  minute: number;
}): string {
  const data = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}`;
  return data;
}
