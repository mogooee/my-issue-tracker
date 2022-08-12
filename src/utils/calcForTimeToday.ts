const calcTimeForToday = (timeStampValue: string) => {
  const today = new Date();
  const timeStamp = new Date(timeStampValue);
  const timeDifference = today.getTime() - timeStamp.getTime();
  const [milliSecond, second, minute, hour, day, month, year] = [1000, 1, 60, 60, 24, 12, 365];

  const minuteDifference = Math.floor(timeDifference / milliSecond / minute);
  if (minuteDifference < second) return '방금전';
  if (minuteDifference < hour) return `${minuteDifference}분전`;

  const hourDifference = Math.floor(minuteDifference / hour);
  if (hourDifference < day) return `${hourDifference}시간전`;

  const dayDifference = Math.floor(hourDifference / day);
  if (dayDifference < month) return `${dayDifference}일전`;

  const monthDifference = Math.floor(dayDifference / day);
  if (monthDifference < month) return `${monthDifference}개월전`;

  const yearDifference = monthDifference / year;
  return `${yearDifference}년전`;
};

export default calcTimeForToday;
