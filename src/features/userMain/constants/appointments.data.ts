import { doctorBooking } from '@/types/appointments.type';

export const doctors: doctorBooking[] = [
  {
    doctorId: '1',
    fullName: 'Dr. K V Shyam Kumar',
    specialty: 'Senior Obstetrician & Surgeon',
    qualification: 'MBBS, MD, DGO',
    location: 'Payyanur, Near Bus Stand',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200', // Placeholder
    rating: 4.9,
    availability: 'Available Today, 4:00 PM',
    tags: ['High Risk Pregnancy', 'C-Section'],
    consultationFee: 500,
  },
  {
    doctorId: '2',
    fullName: 'Dr. Vinod K. Nair',
    specialty: 'Consultant Gynecologist',
    qualification: 'MBBS, MS (OBG)',
    location: 'Kodoth House, Payyanur',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5.0,
    availability: 'Available Tomorrow, 10:00 AM',
    tags: ['Infertility', 'Laparoscopy'],
    consultationFee: 600,
  },
  {
    doctorId: '3',
    fullName: 'Dr. Veena',
    specialty: 'Gynecologist',
    qualification: 'MBBS, DGO',
    location: 'Payyanur',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8,
    availability: 'Available Today, 2:30 PM',
    tags: ['Normal Delivery', 'PCOD'],
    consultationFee: 450,
  },
  {
    doctorId: '4',
    fullName: 'Dr. Shyamala',
    specialty: 'Fertility Specialist',
    qualification: 'MBBS, MD',
    location: 'Payyanur',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.7,
    availability: 'Available Fri, 11:00 AM',
    tags: ['IVF', 'IUI'],
    consultationFee: 700,
  },
];

export const timeSlots = [
  '09:00 AM', '10:30 AM', '11:45 AM',
  '02:15 PM', '04:00 PM', '05:30 PM'
];

export const visitReasons = [
  'Regular Checkup', 'Scan Report', 'Pain/Discomfort', 'Follow up'
];
