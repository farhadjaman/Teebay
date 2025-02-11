import * as React from "react";
import { ApolloWrapper } from "@/lib/apolloProvider.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <Toaster />
      <ApolloWrapper>{children}</ApolloWrapper>
    </React.Suspense>
  );
};
