export interface DetailPackage {
  id: string;
  name: string;
  tagline: string;
  prices: {
    small: number;
    medium: number;
    suv: number;
  };
  duration: string;
  benefits: string[];
  products: string[];
  specs: {
    mainProduct: string;
    washType: string;
    phLevel: string;
    treatmentScope: string;
  };
  imageUrl: string;
}

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface BookingSubmission {
  name: string;
  email: string;
  phone: string;
  packageId: string;
  vehicleSize: 'small' | 'medium' | 'suv';
  bookingDate: string;
  bookingTime: string;
  addOns: string[];
  specialNotes?: string;
  totalPrice: number;
}
