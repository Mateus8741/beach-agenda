import { api } from '../apiConfig';

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export interface Agenda {
  id: string;
  title: string;
  description: string;
  date: string;
  userId: string;
  timeSlots: TimeSlot[];
}

export interface CreateAgendaData {
  id: string;
  title: string;
  description: string;
  date: string;
  timeSlots: {
    id: string;
    time: string;
    isAvailable: boolean;
  }[];
}

export const agendaUseCases = {
  async listAgendas(): Promise<Agenda[]> {
    const { data } = await api.get<Agenda[]>('/agenda');
    return data;
  },

  async createAgenda(agendaData: CreateAgendaData): Promise<Agenda> {
    const { data } = await api.post<Agenda>('/agenda', agendaData);
    return data;
  },

  async updateAgenda(id: string, agendaData: Partial<CreateAgendaData>): Promise<Agenda> {
    const { data } = await api.put<Agenda>(`/agenda/${id}`, agendaData);
    return data;
  },

  async deleteAgenda(id: string): Promise<void> {
    await api.delete(`/agenda/${id}`);
  },
};
