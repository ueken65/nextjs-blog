import React from "react";
import dayjs from "dayjs";

const Date = ({ dateString }: { dateString: string }) => {
  return (
    <time dateTime={dateString}>{dayjs(dateString).format("YYYY-MM-DD")}</time>
  );
};

export default Date;
