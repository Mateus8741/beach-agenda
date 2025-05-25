import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { agendaUseCases } from '@/api/useCases/agenda';

export function useAgenda() {
  const queryClient = useQueryClient();

  const { data: agendas, isLoading: isLoadingAgendas } = useQuery({
    queryKey: ['agendas'],
    queryFn: agendaUseCases.listAgendas,
  });

  const createAgendaMutation = useMutation({
    mutationFn: agendaUseCases.createAgenda,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agendas'] });
    },
  });

  const updateAgendaMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => agendaUseCases.updateAgenda(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agendas'] });
    },
  });

  const deleteAgendaMutation = useMutation({
    mutationFn: agendaUseCases.deleteAgenda,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['agendas'] });
    },
  });

  return {
    agendas,
    isLoadingAgendas,
    createAgenda: createAgendaMutation.mutate,
    updateAgenda: updateAgendaMutation.mutate,
    deleteAgenda: deleteAgendaMutation.mutate,
    isCreating: createAgendaMutation.isPending,
    isUpdating: updateAgendaMutation.isPending,
    isDeleting: deleteAgendaMutation.isPending,
  };
}
