"use client";

import Countdown from "react-countdown";
import { useEffect, useState } from "react";

function getNextSundayMonday(endingDate: Date) {
  const currentDay = endingDate.getDay(); // 0 (Sunday) - 6 (Saturday)

  // Calculate the offset to reach the desired day (0 for Sunday, 1 for Monday)
  const offset = 7 - currentDay + 1;

  const closestDate = new Date(endingDate.getTime() + offset * 86400000); // Add days in milliseconds

  // Set hours, minutes, and seconds to 0
  closestDate.setHours(0, 0, 0);

  return closestDate;
}

const currentTime = new Date();
const endingDate = getNextSundayMonday(currentTime);

const CountDown = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
      isClient ? (
      <Countdown
        className="font-bold text-5xl text-yellow-300"
        date={endingDate}
      />
      ) : (
        <p className="text-3xl text-yellow-300">Loading...</p>
      )
  );
};

export default CountDown;
