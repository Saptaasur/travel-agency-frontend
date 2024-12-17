import { useState } from "react";
import { submitBooking } from "../utils/api";

const BookingForm = ({ packageId, price }: { packageId: string; price: number }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const totalPrice = price * parseInt(formData.travelers.toString());
      await submitBooking({ ...formData, packageId, totalPrice });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  if (isSubmitted) {
    return <div className="text-green-600">Booking successful! Thank you for choosing us.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="number"
        name="travelers"
        value={formData.travelers}
        onChange={handleChange}
        placeholder="Number of Travelers"
        required
        className="w-full border rounded px-4 py-2"
        min="1"
      />
      <textarea
        name="specialRequests"
        value={formData.specialRequests}
        onChange={handleChange}
        placeholder="Special Requests (Optional)"
        className="w-full border rounded px-4 py-2"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
