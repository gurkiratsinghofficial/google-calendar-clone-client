import React from "react";
const { htmlToText } = require("html-to-text");

function EventDetails({ defaultData }) {
  /**view only event details for participants */
  return (
    <div>
      <p className="field-name">Title</p>
      <p>{defaultData.title}</p>
      <p className="field-name">Description</p>
      <p>{htmlToText(defaultData.description)}</p>
      <p className="field-name">Date</p>
      <p>{defaultData.eventDate}</p>
      <p className="field-name">Time</p>
      <p>
        {defaultData.startTime} to {defaultData.endTime}{" "}
      </p>
      <p className="field-name">Organized by</p>
      <p>{defaultData.organizer}</p>
      <p>{defaultData.organizerEmail}</p>
    </div>
  );
}

export default EventDetails;
