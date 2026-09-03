export interface Room {
  id: string;
  name: string;
  category: 'Palace Suite' | 'Royal Heritage Room' | 'Presidential Residence' | 'Villa';
  sizeSqFt: number;
  view: string;
  bedType: string;
  maxGuests: number;
  basePriceINR: number;
  image: string;
  description: string;
  amenities: string[];
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  tagline: string;
  city: string;
  state: string;
  country: string;
  category: 'Palace' | 'Heritage Flagship' | 'Wilderness Lodge' | 'Coastal Sanctuary' | 'Himalayan Retreat';
  rating: number;
  reviewsCount: number;
  startingPriceINR: number;
  heroImage: string;
  gallery: string[];
  description: string;
  heritageStory: string;
  address: string;
  phone: string;
  highlights: string[];
  signatureExperience: string;
  rooms: Room[];
  diningOptions: string[];
  awards: string[];
}

export interface DiningVenue {
  id: string;
  name: string;
  hotelName: string;
  city: string;
  cuisine: string;
  timing: string;
  dressCode: string;
  chefQuote: string;
  image: string;
  description: string;
  signatureDishes: string[];
}

export interface SpaTreatment {
  id: string;
  name: string;
  subtitle: string;
  durationMinutes: number;
  priceINR: number;
  image: string;
  description: string;
  benefits: string[];
}

export interface Booking {
  bookingId: string;
  hotelId: string;
  hotelName: string;
  hotelCity: string;
  hotelImage: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
    rooms: number;
  };
  totalAmountINR: number;
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  paymentMethod: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  addOns: string[];
}

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';
