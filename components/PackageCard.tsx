import React, { useState } from "react";
import Link from "next/link";
import { Package } from "../types";
import BookingForm from "./BookingForm";

const PackageCard = ({ packageData }: { packageData: Package }) => {
  const [isBooking, setIsBooking] = useState(false);

  const handleOpenBooking = () => setIsBooking(true);
  const handleCloseBooking = () => setIsBooking(false);

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl bg-white">
      {/* Image Section */}
      <img
        src={packageData.image}
        alt={packageData.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        {/* Package Title */}
        <h3 className="text-2xl font-semibold text-gray-800 hover:text-blue-500 transition duration-200">
          {packageData.title}
        </h3>
        {/* Description */}
        <p className="text-gray-600 mt-3 line-clamp-2">
          {packageData.description}
        </p>
        {/* Price */}
        <p className="text-lg font-bold mt-4 text-green-500">
          ${packageData.price.toLocaleString()} per person
        </p>
        {/* Buttons */}
        <div className="flex space-x-4 mt-6">
          <Link href={`/package/${packageData._id}`} passHref>
            <button
              className="w-2/3 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded shadow hover:from-blue-600 hover:to-blue-800 focus:ring focus:ring-blue-300 transition duration-200"
              aria-label={`View details of ${packageData.title}`}
            >
              View Details
            </button>
          </Link>
          <button
            onClick={handleOpenBooking}
            className="w-1/2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded shadow hover:from-green-600 hover:to-green-800 focus:ring focus:ring-green-300 transition duration-200"
            aria-label={`Book ${packageData.title}`}
          >
            Book Now
          </button>
        </div>
      </div>
      {/* Booking Form Modal */}
      {isBooking && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md">
            <BookingForm packageData={packageData} onClose={handleCloseBooking} />
            <button
              onClick={handleCloseBooking}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close booking form"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
