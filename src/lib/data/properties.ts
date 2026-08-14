import type { Property } from '@/types/property';

export const properties: Property[] = [
  {
    id: 'the-scholars-residence',
    title: 'The Scholars Residence',
    subtitle: 'Modern student living near campus',
    location: 'Bloomsbury, London',
    price: '£1,820/mo',
    bedrooms: 2,
    bathrooms: 1,
    area: '650 sq ft',
    image: '/images/property-1.svg',
    verified: true,
    nearCampus: '0.2 miles to UCL',
    amenities: ['WiFi', 'Laundry', 'Study Lounge', 'Gym'],
    description:
      'A premium student residence with a sleek modern interior, large windows, and concierge services. Ideal for students seeking a secure, study-focused environment close to campus.',
    highlights: ['Fully furnished', 'Private study pods', '24/7 security'],
    hostName: 'Olivia Martin',
    hostAvatar: '/images/student-avatar.svg',
  },
  {
    id: 'scholar-place',
    title: 'Scholar Place',
    subtitle: 'High-end shared apartments',
    location: 'Soho, London',
    price: '£1,680/mo',
    bedrooms: 1,
    bathrooms: 1,
    area: '520 sq ft',
    image: '/images/property-2.svg',
    verified: false,
    nearCampus: '0.5 miles to LSE',
    amenities: ['Study lounge', 'Bike storage', 'Fitness studio'],
    description:
      'A stylish apartment designed for focused students, with premium amenities and flexible lease options. Great for those who want quick access to central London campuses.',
    highlights: ['Flexible lease', 'Near transport'],
    hostName: 'Elliot Reed',
    hostAvatar: '/images/student-avatar.svg',
  },
  {
    id: 'harbor-halls',
    title: 'Harbor Halls',
    subtitle: 'Quiet living for exam season',
    location: 'King’s Cross, London',
    price: '£1,590/mo',
    bedrooms: 1,
    bathrooms: 1,
    area: '500 sq ft',
    image: '/images/property-3.svg',
    verified: true,
    nearCampus: '0.3 miles to UCL',
    amenities: ['Quiet building', 'Study spaces', 'Café access'],
    description:
      'A calm residence tailored for students who need quiet study spaces and quick campus access. Perfect for students in exam months and term-time stays.',
    highlights: ['Quiet floors', 'Study spaces'],
    hostName: 'Mia Patel',
    hostAvatar: '/images/student-avatar.svg',
  },
];

export function getPropertyById(id: string) {
  return properties.find((property) => property.id === id);
}
