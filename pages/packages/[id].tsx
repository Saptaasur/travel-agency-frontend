import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Package } from "../../types";
import BookingForm from "../../components/BookingForm";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PackageDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [packageData, setPackageData] = useState<Package | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://travel-backend-k4u2.onrender.com/api/packages/${id}`)
        .then((res) => res.json())
        .then((data) => setPackageData(data))
        .catch((error) => console.error("Error fetching package:", error));
    }
  }, [id]);

  if (!packageData) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{packageData.title}</h1>
        <img
          src={packageData.image}
          alt={packageData.title}
          className="w-full h-96 object-cover mb-4"
        />
        <p className="mb-4">{packageData.description}</p>
        <p className="text-lg font-bold">Price: ${packageData.price} per person</p>
        <p className="text-lg">Available Dates: {packageData.availableDates.join(", ")}</p>
        <BookingForm packageId={id as string} price={packageData.price} />
      </main>
      <Footer />
    </div>
  );
};

export default PackageDetails;
