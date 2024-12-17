import { useEffect, useState } from "react";
import { Package } from "../types";
import PackageCard from "../components/PackageCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetch("https://travel-backend-k4u2.onrender.com/api/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Tour Packages</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} packageData={pkg} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
