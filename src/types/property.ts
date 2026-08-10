export interface Property {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  verified: boolean;
  nearCampus: string;
  amenities: string[];
  description: string;
  highlights: string[];
  hostName: string;
  hostAvatar: string;
}
