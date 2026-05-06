export interface HotelCenter {
  id: string;
  name: string;
  reference: string;
  address: string;
  mapUrl: string;
  description: string;
  urlSegment: string;
  phone: string | null;
  cellPhone: string | null;
  garage: boolean;
  rooms: any[];
  images: any[];
}