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
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      // Check if the response was not successful
      if (!response.ok) {
        // Log the response status and body for better debugging
        const errorBody = await response.text();
        console.error(`Failed to submit booking. Status: ${response.status}, Error: ${errorBody}`);
        throw new Error(`Failed to submit booking: ${errorBody}`);
      }
  
      // Return the response JSON if the request was successful
      return response.json();
    } catch (error) {
      console.error("Error submitting booking:", error);
      throw error; // Re-throw error after logging it
    }
  };
  