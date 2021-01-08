import React, { useEffect, useState } from "react";

function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    /**reRender after 1 second */
    var timerID = setInterval(() => tick(), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }
  /**Render live clock */
  return (
    <div>
      <h2 className="dashboard-time">{date.toLocaleTimeString()}.</h2>
    </div>
  );
}

export default Clock;
