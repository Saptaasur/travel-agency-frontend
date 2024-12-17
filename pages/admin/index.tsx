import { useEffect, useState } from "react";
import { Package, Booking } from "../../types";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: "",
    image: "",
  });

  // Fetch packages and bookings
  useEffect(() => {
    fetchPackages();
    fetchBookings();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/packages");
      const data = await res.json();
      setPackages(data);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      
      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]); // Fallback to empty array if not an array
        console.error("Fetched bookings data is not an array");
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  // Add a new package
  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...newPackage,
      price: parseFloat(newPackage.price),
      availableDates: newPackage.availableDates.split(","),
    };

    try {
      const res = await fetch("http://localhost:5000/api/packages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchPackages();
        setNewPackage({
          title: "",
          description: "",
          price: "",
          availableDates: "",
          image: "",
        });
        alert("Package added successfully!");
      } else {
        console.error("Error adding package");
      }
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  // Delete a package
  const handleDeletePackage = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/packages/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchPackages();
        alert("Package deleted successfully!");
      } else {
        console.error("Error deleting package");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center items-center py-8">
        <div className="w-full max-w-screen-lg px-4 sm:px-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

          {/* Add Package Form */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Package</h2>
            <form onSubmit={handleAddPackage} className="flex flex-col gap-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Title"
                value={newPackage.title}
                onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                className="border rounded px-4 py-2"
                required
              />
              <textarea
                placeholder="Description"
                value={newPackage.description}
                onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                className="border rounded px-4 py-2"
                required
              ></textarea>
              <input
                type="number"
                placeholder="Price"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="border rounded px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Available Dates (comma-separated)"
                value={newPackage.availableDates}
                onChange={(e) => setNewPackage({ ...newPackage, availableDates: e.target.value })}
                className="border rounded px-4 py-2"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newPackage.image}
                onChange={(e) => setNewPackage({ ...newPackage, image: e.target.value })}
                className="border rounded px-4 py-2"
                required
              />
              <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                Add Package
              </button>
            </form>
          </section>

          {/* Display Packages */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Tour Packages</h2>
            <ul className="space-y-4">
              {packages.map((pkg) => (
                <li
                  key={pkg._id}
                  className="flex justify-between items-center border rounded p-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{pkg.title}</h3>
                    <p>{pkg.description}</p>
                    <p>${pkg.price}</p>
                    <p>Dates: {pkg.availableDates.join(", ")}</p>
                  </div>
                  <button
                    onClick={() => handleDeletePackage(pkg._id)}
                    className="bg-red-500 text-white rounded px-4 py-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Display Bookings */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-center">Bookings</h2>
            <ul className="space-y-4">
              {bookings.map((booking) => (
                <li key={booking._id} className="border rounded p-4">
                  <h3>{booking.name}</h3>
                  <p>${booking.totalPrice}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
