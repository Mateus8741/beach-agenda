import { api } from '../apiConfig';

interface Agenda {
  id: string;
  title: string;
  description: string;
  date: string;
  userId: string;
}

export interface CreateAgendaData {
  title: string;
  description: string;
  date: string;
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
