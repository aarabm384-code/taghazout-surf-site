export interface ServiceProvider {
  id: string;
  name: string;
  service: string;
  priceEUR: number;
  priceMAD: number;
  isTrusted?: boolean;
  duration?: string;
  details?: string;
  image?: string;
  phone?: string;
  description?: string;
}

export interface Trip {
  id: string;
  name: string;
  location: string;
  duration: string;
  priceEUR: number;
  priceMAD: number;
  description: string;
  image?: string;
  isTrusted?: boolean;
}

export const taxiServices: ServiceProvider[] = [
  { id: 'taxi-1', name: 'Ahmed Taxi Service', service: 'Airport Transfer (Agadir - Taghazout)', priceEUR: 35, priceMAD: 350, isTrusted: true, details: 'Up to 4 passengers, includes luggage' },
  { id: 'taxi-2', name: 'Said Transport', service: 'Airport Transfer (Agadir - Taghazout)', priceEUR: 30, priceMAD: 300, details: 'Up to 4 passengers' },
  { id: 'taxi-3', name: 'Local Taxi Co.', service: 'Local Trip (Taghazout - Agadir City)', priceEUR: 25, priceMAD: 250, isTrusted: true, details: 'Round trip, 3 hour wait included' },
  { id: 'taxi-4', name: 'Hassan Rides', service: 'Paradise Valley Trip', priceEUR: 40, priceMAD: 400, details: 'Full day trip, up to 6 people' },
  { id: 'taxi-5', name: 'Coastal Drivers', service: 'Imsouane Day Trip', priceEUR: 60, priceMAD: 600, isTrusted: true, details: 'Full day, up to 4 passengers' }
];

export const surfServices: ServiceProvider[] = [
  { id: 'surf-1', name: 'Wave Riders Surf School', service: '1 Hour Surf Lesson', priceEUR: 25, priceMAD: 250, isTrusted: true, duration: '1 hour', details: 'Includes board, wetsuit, instructor' },
  { id: 'surf-2', name: 'Taghazout Surf Academy', service: '1 Hour Surf Lesson', priceEUR: 20, priceMAD: 200, duration: '1 hour', details: 'Group lesson, equipment included' },
  { id: 'surf-3', name: 'Ocean Spirit', service: '2 Hours Surf Lesson', priceEUR: 40, priceMAD: 400, isTrusted: true, duration: '2 hours', details: 'Private instructor, all equipment' },
  {
    id: 'surf-4',
    name: 'Yalla Surf Shop',
    service: 'Full Day Board Rental',
    priceEUR: 10,
    priceMAD: 100,
    duration: 'Full day',
    details: 'Includes board, leash, wax',
    image: 'https://yallasurfshop.com/wp-content/uploads/2025/09/cropped-120px-logo-01.png',
    phone: '212646413504'
  },
  {
    id: 'surf-5',
    name: 'Akram Surf',
    service: 'Full Day Board Rental',
    priceEUR: 10,
    priceMAD: 100,
    isTrusted: true,
    duration: 'Full day',
    details: 'High-quality boards, insurance included',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AHVAwepv1pPWY65UlnmU5w8LmlmIzk7c7PLGws916oVh6R6xh3GbfvvvF6B0R__QzdqgFo6Vz-dQIBQYN6Asv7UfxJshxsFX8xaSq6woE2U2Fb52yTt5Z1QCvxs1XZGo7IuIV3PSzM_WA_-O_ePs=s680-w680-h510-rw',
    phone: '212630210108'
  },
  { id: 'surf-6', name: 'Pro Surf Morocco', service: '2 Hours Surf Lesson', priceEUR: 35, priceMAD: 350, duration: '2 hours', details: 'Small groups, video analysis' }
];

export const trips: Trip[] = [
  { id: 'trip-1', name: 'Paradise Valley Adventure', location: 'Paradise Valley', duration: 'Half Day (4-5 hours)', priceEUR: 30, priceMAD: 300, description: 'Explore natural pools, palm groves, and scenic mountain trails. Perfect for swimming and cliff jumping.', isTrusted: true },
  { id: 'trip-2', name: 'Imsouane Surf & Fish Village', location: 'Imsouane', duration: 'Full Day (8 hours)', priceEUR: 45, priceMAD: 450, description: 'Visit one of Morocco\'s best surf spots and traditional fishing village. Includes transport and guide.' },
  { id: 'trip-3', name: 'Essaouira Mogador City', location: 'Essaouira', duration: 'Full Day (10 hours)', priceEUR: 60, priceMAD: 600, description: 'Discover the windy city, its Medina UNESCO site, and fresh seafood. Perfect for culture lovers.', isTrusted: true },
  { id: 'trip-4', name: 'Sand Dunes & Desert Experience', location: 'Timlalin', duration: 'Half Day (4 hours)', priceEUR: 35, priceMAD: 350, description: 'Camel ride and sandboarding on massive dunes overlooking the Atlantic Ocean.' },
  { id: 'trip-5', name: 'Souss Massa National Park', location: 'Massa', duration: 'Full Day (7 hours)', priceEUR: 50, priceMAD: 500, description: 'Wildlife safari to see flamingos, ibis, and rare bald ibis. Includes bird watching guide.', isTrusted: true }
];

export const generateWhatsAppMessage = (serviceName: string, providerName: string): string => {
  return `Hello ${providerName}, I found you on Taghazout Fair Prices and I'd like to book: ${serviceName}. Can you confirm availability?`;
};

export const generateWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};