"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext } from "react";

interface Props {
  children: React.ReactNode;
}

export const QueryClientContext = createContext<QueryClient | null>(null);

const QueryWrapper = ({ children }: Props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientContext.Provider value={queryClient}>
        {children}
      </QueryClientContext.Provider>
    </QueryClientProvider>
  );
};
export default QueryWrapper;
