"use client";

import { IChildrenProps } from "@customTypes/common";
import { store } from "@store/index";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

export default function Providers({ children }: IChildrenProps) {
  const queryClient = new QueryClient();

  // Render
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </DndProvider>
  );
}
