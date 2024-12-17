import React from "react";

interface BookingFormProps {
  packageId: string;
  price: number;
  onClose?: () => void; // Optional close handler
}

const BookingForm: React.FC<BookingFormProps> = ({ packageId, price, onClose }) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log(`Booking confirmed for package ID: ${packageId} at $${price}`);
    if (onClose) onClose(); // Close modal if onClose is provided
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book Your Package</h2>
      <p className="mb-2">Package ID: {packageId}</p>
      <p className="mb-4 text-green-500 font-semibold">Price: ${price}</p>
      <form onSubmit={handleFormSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">Full Name</span>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            required
            placeholder="Enter your full name"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input
            type="email"
            className="w-full p-2 border rounded mt-1"
            required
            placeholder="Enter your email"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </form>
      {onClose && (
        <button
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default BookingForm;
