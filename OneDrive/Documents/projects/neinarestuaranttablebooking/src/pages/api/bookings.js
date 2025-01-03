let bookedSlots = [];  // This would ideally be stored in a database.

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { date, time, name, email, phone } = req.body;

    // Find the slot to be booked
    const slotIndex = availableSlots.findIndex(
      slot => slot.date === date && slot.time === time
    );

    if (slotIndex >= 0 && availableSlots[slotIndex].isAvailable) {
      // Mark the slot as booked
      availableSlots[slotIndex].isAvailable = false;

      // Save booking details
      bookedSlots.push({ date, time, name, email, phone });

      return res.status(200).json({ message: 'Booking confirmed', bookingDetails: { date, time, name, email, phone } });
    } else {
      return res.status(400).json({ message: 'Slot not available' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
