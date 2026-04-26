"use client";

import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { store } from "@/redux/store/store";

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <CookiesProvider>
        <Provider store={store}>{children}</Provider>

        <Toaster duration={3000} richColors position="top-right" />
      </CookiesProvider>
    </>
  );
}
