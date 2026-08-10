export interface UserSummary {
  name: string;
  role: 'student' | 'landlord';
  notifications: number;
  savedProperties: number;
  activeApplications: number;
}
