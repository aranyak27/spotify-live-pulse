import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { LiveTab } from "./pages/live/LiveTab";
import { EventDetail } from "./pages/event/EventDetail";
import { TicketSelection } from "./pages/event/TicketSelection";
import { Checkout } from "./pages/event/Checkout";
import { Confirmation } from "./pages/event/Confirmation";
import { YourTickets } from "./pages/tickets/YourTickets";
import { TicketDetail } from "./pages/tickets/TicketDetail";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/live" element={<LiveTab />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tickets" element={<YourTickets />} />
          <Route path="/ticket/:id" element={<TicketDetail />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/:id/tickets" element={<TicketSelection />} />
          <Route path="/event/:id/checkout" element={<Checkout />} />
          <Route path="/event/:id/confirmation" element={<Confirmation />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
