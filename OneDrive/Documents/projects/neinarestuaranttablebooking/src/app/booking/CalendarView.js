import { useState, useEffect } from "react";
import { format, addMonths, subMonths, eachDayOfInterval, startOfMonth, endOfMonth, isToday, isBefore } from "date-fns";
import "../styles/calendar.css"; // Ensure the CSS file is imported

export default function CalendarView({ onDateSelect, onSlotSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});

  // Generate default slots for the month
  useEffect(() => {
    const slots = {};
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });

    daysInMonth.forEach((day) => {
      const dayFormatted = format(day, "yyyy-MM-dd");
      const daySlots = [];
      for (let i = 10; i < 18; i++) {
        daySlots.push({
          time: `${i}:00`,
          isAvailable: !isBefore(day, new Date()),
        });
      }
      slots[dayFormatted] = daySlots;
    });

    setAvailableSlots(slots);

    // Load booked slots from localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.forEach((booking) => {
      if (slots[booking.date]) {
        slots[booking.date] = slots[booking.date].map((slot) =>
          slot.time === booking.slot ? { ...slot, isAvailable: false } : slot
        );
      }
    });
    setAvailableSlots({ ...slots });
  }, [currentMonth]);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(format(date, "yyyy-MM-dd"));
  };

  const handleSlotSelect = (slot, date) => {
    if (slot.isAvailable) {
      if (window.confirm(`Book slot ${slot.time} on ${date}?`)) {
        const bookingDetails = { date, slot: slot.time };
        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(bookingDetails);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        const updatedSlots = { ...availableSlots };
        updatedSlots[date] = updatedSlots[date].map((s) =>
          s.time === slot.time ? { ...s, isAvailable: false } : s
        );
        setAvailableSlots(updatedSlots);
        onSlotSelect(slot);
      }
    } else {
      alert("This slot is already booked!");
    }
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <button className="nav-button" onClick={handlePrevMonth}>←</button>
        <h3>{format(currentMonth, "MMMM yyyy")}</h3>
        <button className="nav-button" onClick={handleNextMonth}>→</button>
      </header>

      <div className="calendar-grid">
        {daysInMonth.map((day) => {
          const dayFormatted = format(day, "yyyy-MM-dd");
          const isBooked = availableSlots[dayFormatted]?.every(slot => !slot.isAvailable);
          const isAvailable = availableSlots[dayFormatted]?.some(slot => slot.isAvailable);

          return (
            <button
              key={dayFormatted}
              className={`calendar-day ${isToday(day) ? "today" : ""} ${isBooked ? "booked" : ""} ${isAvailable ? "available" : ""}`}
              onClick={() => handleDateClick(dayFormatted)}
              disabled={isBooked}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {selectedDate && availableSlots[selectedDate] && (
        <div className="slots-container">
          <h4>Available Slots for {format(new Date(selectedDate), "MMMM d, yyyy")}</h4>
          {availableSlots[selectedDate].length === 0 ? (
            <p>No available slots for this day.</p>
          ) : (
            availableSlots[selectedDate].map((slot, index) => (
              <button
                key={index}
                className={`slot-button ${slot.isAvailable ? "available" : "booked"}`}
                onClick={() => handleSlotSelect(slot, selectedDate)}
                disabled={!slot.isAvailable}
              >
                {slot.time}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
