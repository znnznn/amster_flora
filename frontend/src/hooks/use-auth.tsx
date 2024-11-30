import { credentialsLogin, getCurrentUser, isAuthenticated, logout as logoutApi } from '@/lib/auth';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: credentialsLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });

  const { data: isAuthenticatedStatus } = useQuery({
    queryKey: ['auth'],
    queryFn: isAuthenticated,
  });

//   const { data: user } = useQuery<User | null>({
//     queryKey: ['user'],
//     queryFn: getCurrentUser,
//     enabled: isAuthenticatedStatus,
//   });

  const handleLogout = () => {
    logoutApi();
    queryClient.setQueryData(['user'], null);
    queryClient.invalidateQueries({ queryKey: ['auth'] });
  };

  return {
    login: loginMutation.mutate,
    logout: handleLogout,
    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
    isAuthenticated: isAuthenticatedStatus,
    user: getCurrentUser(),
  };
};
