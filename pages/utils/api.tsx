import React, { useEffect, useState } from 'react';

// Define the type for your fetched data
interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
}

const ApiPage = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/utils/api');
        const data = await response.json();
        setPackages(data.packages); // Assuming response has "packages"
      } catch (err) {
        setError('Failed to fetch packages');
        console.error(err);
      }
    };

    fetchPackages();
  }, []);

  return (
    <div>
      <h1>Available Packages</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <li key={pkg.id}>
              {pkg.name} - {pkg.price}
            </li>
          ))
        ) : (
          <p>No packages available</p>
        )}
      </ul>
    </div>
  );
};

export default ApiPage;
