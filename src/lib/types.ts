export interface Booking {
  id: number;
  guestId: number;
  startDate: Date;
  endDate: Date;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: Date;
  cabinId?: number;
  cabins: Cabin;
}

export interface Bookings {
  id: number;
  created_at: Date;
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId?: number;
  cabins: any;
}

export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description?: string;
  image: string;
}

export interface Settings {
  id: number;
  created_at: Date;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}

export interface Session {
  user?: User;
  expires: string;
}

export interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  guestId?: string | null;
}
