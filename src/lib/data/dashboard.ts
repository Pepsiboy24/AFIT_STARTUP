import type { UserSummary } from '@/types/user';

export const userSummary: UserSummary = {
  name: 'Alex',
  role: 'student',
  notifications: 3,
  savedProperties: 6,
  activeApplications: 4,
};

export const upcomingAppointments = [
  {
    date: 'Thu, Jul 28',
    time: '11:00 AM',
    property: 'The Scholars Residence',
    status: 'Confirmed',
  },
  {
    date: 'Sat, Aug 2',
    time: '2:00 PM',
    property: 'Harbor Halls',
    status: 'Pending',
  },
];

export const quickActions = [
  { label: 'Saved homes', value: 6 },
  { label: 'Applications', value: 4 },
  { label: 'Messages', value: 5 },
];
