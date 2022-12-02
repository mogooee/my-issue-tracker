const dateConverter = (today: Date, inputDate: Date) => {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();

  return today.getFullYear() === year ? `${month}월 ${date}일` : `${year}년 ${month}월 ${date}일`;
};

const calcTimeForToday = (timeStampValue: string) => {
  const today = new Date();
  const timeStamp = new Date(timeStampValue);
  const timeDifference = today.getTime() - timeStamp.getTime();
  const [milliSecond, second, minute, hour, day, month] = [1000, 1, 60, 60, 24, 30];

  const minuteDifference = Math.floor(timeDifference / milliSecond / minute);
  if (minuteDifference < second) return '방금 전';
  if (minuteDifference < hour) return `${minuteDifference}분 전`;

  const hourDifference = Math.floor(minuteDifference / hour);
  if (hourDifference < day) return `${hourDifference}시간 전`;

  const dayDifference = Math.floor(hourDifference / day);
  if (dayDifference < month && today.getMonth() === timeStamp.getMonth()) return `${dayDifference}일 전`;

  return dateConverter(today, timeStamp);
};

export default calcTimeForToday;
