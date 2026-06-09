export type AuthRole = 'CLIENT' | 'ADMIN';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
  phone?: string | null;
  address?: string | null;
  bio?: string | null;
}

export interface ServiceItem {
  id: string;
  name: string;
  duration: string;
  price: string;
  active: boolean;
}

export interface AppointmentItem {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  professional?: string | null;
  price: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface ClientDashboardData {
  totalCount: number;
  recentCount: number;
  upcomingCount: number;
  upcomingAppointments: AppointmentItem[];
  recentAppointments: AppointmentItem[];
}

export interface AdminDashboardData {
  totalAppointments: number;
  todayAppointments: number;
  totalRevenue: number;
  activeClients: number;
  appointments: AppointmentItem[];
}

export interface HistoryData {
  items: AppointmentItem[];
  counts: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
  };
}

const API_BASE = '/api';

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
    ...init,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const payload = text ? JSON.parse(text) : undefined;

  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || 'Erro na requisição');
  }

  return payload as T;
}

export const api = {
  login: (email: string, password: string) => request<AuthUser>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (name: string, email: string, password: string) => request<AuthUser>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }),
  logout: () => request<void>('/auth/logout', { method: 'POST' }),
  me: () => request<AuthUser>('/auth/me'),
  updateProfile: (payload: { name: string; email: string; phone?: string; address?: string; bio?: string }) =>
    request<AuthUser>('/users/me', { method: 'PUT', body: JSON.stringify(payload) }),
  services: () => request<ServiceItem[]>('/services'),
  createService: (payload: { name: string; duration: string; price: string }) =>
    request<ServiceItem>('/services', { method: 'POST', body: JSON.stringify(payload) }),
  deleteService: (id: string) => request<void>(`/services/${id}`, { method: 'DELETE' }),
  clientDashboard: () => request<ClientDashboardData>('/dashboard/client'),
  adminDashboard: () => request<AdminDashboardData>('/dashboard/admin'),
  history: () => request<HistoryData>('/history'),
  createAppointment: (payload: { serviceId: string; date: string; time: string }) =>
    request<AppointmentItem>('/appointments', { method: 'POST', body: JSON.stringify(payload) }),
  myAppointments: () => request<AppointmentItem[]>('/appointments/me'),
};
