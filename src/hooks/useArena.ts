import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { UpdateArenaData } from '@/api/useCases/arena';
import { arenaApi } from '@/api/useCases/arena';

export function useArena() {
  const queryClient = useQueryClient();

  const { data: arenas, isLoading: isLoadingArenas } = useQuery({
    queryKey: ['arenas'],
    queryFn: arenaApi.getAll,
  });

  const createArenaMutation = useMutation({
    mutationFn: arenaApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['arenas'] });
    },
  });

  const updateArenaMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateArenaData }) => arenaApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['arenas'] });
    },
  });

  const deleteArenaMutation = useMutation({
    mutationFn: arenaApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['arenas'] });
    },
  });

  return {
    arenas,
    isLoadingArenas,
    createArena: createArenaMutation.mutate,
    updateArena: updateArenaMutation.mutate,
    deleteArena: deleteArenaMutation.mutate,
    isCreating: createArenaMutation.isPending,
    isUpdating: updateArenaMutation.isPending,
    isDeleting: deleteArenaMutation.isPending,
  };
}
