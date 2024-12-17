export interface Package {
    _id: string;
    title: string;
    description: string;
    price: number;
    availableDates: string[];
    image: string;
  }
  
  export interface Booking {
    _id: string;
    packageId: string;
    name: string;
    email: string;
    phone: string;
    travelers: number;
    specialRequests?: string;
    totalPrice: number;
  }
  