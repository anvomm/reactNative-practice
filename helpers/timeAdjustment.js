export const adjustTime = (time) => {
  const today = new Date(time);
  const offset = today.getTimezoneOffset() * 60 * 1000;
  const adjustedTime = time - offset;
  const adjustedDate = new Date(adjustedTime);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  const monthTranslated = adjustedDate.toLocaleString("ru-RU", options);
  const month = monthTranslated.split(" ")[1];
  
  const rightDate = adjustedDate.toUTCString().split(" ");
  const newDate = [
    rightDate[1],
    month,
    rightDate[3],
    rightDate[4].split(":")[0],
    rightDate[4].split(":")[1],
  ];

  return newDate.join(" ");
};
