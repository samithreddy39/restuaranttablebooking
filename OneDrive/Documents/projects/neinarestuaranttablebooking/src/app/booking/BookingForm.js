import { useState } from "react";
import '../styles/booking.css';
export default function BookingForm({ selectedSlot, selectedDate, onBookingConfirm }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingDetails = {
      ...formData,
      date: selectedDate,
      slot: selectedSlot.time,
    };

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(bookingDetails);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    onBookingConfirm(selectedSlot);

    setFormData({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="booking-form-container">
      <div className="booking-form">
        <h2>Confirm Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
