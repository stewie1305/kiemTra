import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 1,
      gcTime: 1000 * 60 * 10,
      staleTime: 1000 * 60 * 3,
    },
  },
});
