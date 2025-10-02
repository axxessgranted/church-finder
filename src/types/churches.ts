export type Church = {
  id: string;
  name: string;
  denomination?: string;
  city?: string;
  prefecture?: string;
  address?: string;
  latitude: number;
  longitude: number;
  languages: string[];
  website?: string;
  contact_email?: string;
  contact_phone?: string;
  service_times?: Record<string, string>;
  description?: string;
  created_at?: string;
};
