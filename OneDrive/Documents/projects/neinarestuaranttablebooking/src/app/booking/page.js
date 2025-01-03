// src/app/booking/page.js
'use client';

import React, { useState, useEffect } from 'react';
import BookingForm from './BookingForm';
import CalendarView from './CalendarView';

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/available-slots?date=${selectedDate}`)
        .then((response) => response.json())
        .then((data) => setAvailableSlots(data));
    }
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  return (
    <div>
      <h2>Make a Reservation</h2>

      <CalendarView
        onDateSelect={handleDateSelect}
        availableSlots={availableSlots}
        onSlotSelect={handleSlotSelect}
      />

      {selectedDate && selectedSlot && (
        <BookingForm selectedDate={selectedDate} selectedSlot={selectedSlot} />
      )}
    </div>
  );
}
