export const fetchPackages = async () => {
    const response = await fetch("/api/packages");
    if (!response.ok) throw new Error("Failed to fetch packages");
    return response.json();
  };
  
  export const fetchPackageById = async (id: string) => {
    const response = await fetch(`/api/packages/${id}`);
    if (!response.ok) throw new Error("Failed to fetch package details");
    return response.json();
  };
  
  export const submitBooking = async (bookingData: any) => {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });
    if (!response.ok) throw new Error("Failed to submit booking");
    return response.json();
  };
  