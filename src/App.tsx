import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import BusLines from "./pages/BusLines";
import Services from "./pages/Services";
import Education from "./pages/Education";
import Places from "./pages/Places";
import ImportantNumbers from "./pages/ImportantNumbers";
import About from "./pages/About";
import SubmitBusiness from "./pages/SubmitBusiness";
import NotFound from "./pages/NotFound";
import AdminBus from "./pages/AdminBus";
import Admin from "./pages/Admin";
import SearchPage from "./pages/Search";
import AuthoritiesPage from "./pages/AuthoritiesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/buses" element={<BusLines />} />
            <Route path="/services" element={<Services />} />
            <Route path="/education" element={<Education />} />
            <Route path="/places" element={<Places />} />
            <Route path="/numbers" element={<ImportantNumbers />} />
            <Route path="/about" element={<About />} />
            <Route path="/authorities" element={<AuthoritiesPage />} />
            <Route path="/submit-business" element={<SubmitBusiness />} />
            <Route path="/admin-bus" element={<AdminBus />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
