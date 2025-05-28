import { api } from '../apiConfig';
import type { Agenda } from './agenda';

export interface Arena {
  id: string;
  name: string;
  location: string;
  tags: string[];
  agendas?: Agenda[];
}

export interface CreateArenaData {
  name: string;
  location: string;
  tags?: string[];
}

export interface UpdateArenaData {
  name?: string;
  location?: string;
  tags?: string[];
}

export const arenaApi = {
  getAll: async (): Promise<Arena[]> => {
    const response = await api.get('/arenas');
    return response.data;
  },

  getById: async (id: string): Promise<Arena> => {
    const response = await api.get(`/arenas/${id}`);
    return response.data;
  },

  create: async (data: CreateArenaData): Promise<Arena> => {
    const response = await api.post('/arenas', data);
    return response.data;
  },

  update: async (id: string, data: UpdateArenaData): Promise<Arena> => {
    const response = await api.put(`/arenas/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`/arenas/${id}`);
    return response.data;
  },
};
