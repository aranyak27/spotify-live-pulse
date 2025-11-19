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
import { Resale } from "./pages/event/Resale";
import { Waitlist } from "./pages/event/Waitlist";
import { SellTicket } from "./pages/event/SellTicket";
import { VenueMap } from "./pages/event/VenueMap";
import { PostEvent } from "./pages/event/PostEvent";
import { ExclusiveContent } from "./pages/event/ExclusiveContent";
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
          <Route path="/ticket/:id/sell" element={<SellTicket />} />
          <Route path="/ticket/:id/post-event" element={<PostEvent />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/:id/tickets" element={<TicketSelection />} />
          <Route path="/event/:id/checkout" element={<Checkout />} />
          <Route path="/event/:id/confirmation" element={<Confirmation />} />
          <Route path="/event/:id/resale" element={<Resale />} />
          <Route path="/event/:id/waitlist" element={<Waitlist />} />
          <Route path="/event/:id/venue-map" element={<VenueMap />} />
          <Route path="/event/:id/exclusive" element={<ExclusiveContent />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
