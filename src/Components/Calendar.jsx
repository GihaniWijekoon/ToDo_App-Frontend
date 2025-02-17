import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    onDateChange(selectedDate);
  };

  return (
    <div className="calendar-container">
      <h3 className="calendar-day">
        {date.toLocaleDateString("en-US", { weekday: "long" })}
      </h3>
      <h2 className="calendar-date">
        {date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </h2>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default CalendarComponent;
