export interface RevenueDataPoint {
  label: string;
  amount: number;
}

export interface TopDoctor {
  id: string;
  name: string;
  specialty: string;
  appointments: number;
}

export interface AdminDashboardStatsData {
  totalRegisteredWomen: number;
  pendingDoctorApprovals: number;
  upcomingAppointments: number;
  totalRevenue: number;
  revenueOverview: RevenueDataPoint[];
  topDoctors: TopDoctor[];
}
