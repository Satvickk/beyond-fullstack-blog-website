export default TimeFormat = (time) => {
  const isoDate = time;
  const date = new Date(isoDate);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // timeZoneName: "short",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);

  return (formattedDate); // "July 7, 2024 at 9:31:31 AM GMT+0"
};
