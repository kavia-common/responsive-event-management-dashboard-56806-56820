import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./layout/AppLayout";
import EventsPage from "./pages/EventsPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

/**
 * PUBLIC_INTERFACE
 * App is the root component that wires providers and routes.
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/events" replace />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
