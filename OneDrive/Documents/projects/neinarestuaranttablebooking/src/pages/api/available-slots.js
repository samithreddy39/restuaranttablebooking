// This will simulate the database of available slots.
let availableSlots = [
  // We'll create slots for every day dynamically.
  // Here we assume each day will have slots available from 10 AM to 5 PM.
  { date: '2025-01-01', time: '10:00 AM', isAvailable: true },
  { date: '2025-01-01', time: '11:00 AM', isAvailable: true },
  { date: '2025-01-01', time: '12:00 PM', isAvailable: true },
  { date: '2025-01-01', time: '1:00 PM', isAvailable: true },
  { date: '2025-01-01', time: '2:00 PM', isAvailable: true },
  { date: '2025-01-01', time: '3:00 PM', isAvailable: true },
  { date: '2025-01-01', time: '4:00 PM', isAvailable: true },
  { date: '2025-01-01', time: '5:00 PM', isAvailable: true },
  // More slots for other days would follow the same structure.
];

// API route to fetch available slots for a specific date
export default function handler(req, res) {
  const { date } = req.query;
  
  // Fetch available slots for the requested date
  const slotsForDate = availableSlots.filter(slot => slot.date === date);

  res.status(200).json(slotsForDate);
}
