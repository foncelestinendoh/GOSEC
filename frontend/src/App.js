import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "@/components/ui/sonner";
import GosecLayout from "@/components/GosecLayout";
import { JoinProgramDialog } from "@/components/sections/forms/JoinProgramDialog";
import { DonateDialog } from "@/components/sections/forms/DonateDialog";
import { ContactDialog } from "@/components/sections/forms/ContactDialog";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ProgramsPage from "@/pages/ProgramsPage";
import FAQPage from "@/pages/FAQPage";
import ContactPage from "@/pages/ContactPage";
import GalleryPage from "@/pages/GalleryPage";
import EventsPage from "@/pages/EventsPage";
import ProgramDetailPage from "@/pages/ProgramDetailPage";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Admin pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminContentPage from "@/pages/admin/AdminContentPage";
import AdminProgramsPage from "@/pages/admin/AdminProgramsPage";
import AdminEventsPage from "@/pages/admin/AdminEventsPage";
import AdminGalleryPage from "@/pages/admin/AdminGalleryPage";
import AdminFormsPage from "@/pages/admin/AdminFormsPage";
import AdminLeadershipPage from "@/pages/admin/AdminLeadershipPage";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

const PublicSite = () => {
  const [openJoin, setOpenJoin] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  const handleFormSubmitted = (type) => {
    toast.success(
      type === "join"
        ? "Thank you – your interest in GOSEC programs has been submitted!"
        : type === "donate"
        ? "Thank you – your donation pledge has been submitted!"
        : "Your contact request has been submitted!"
    );
  };

  return (
    <GosecLayout>
      <SiteHeader
        onJoinClick={() => setOpenJoin(true)}
        onMemberClick={() => setOpenDonate(true)}
        onContactClick={() => setOpenContact(true)}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenJoin={() => setOpenJoin(true)}
                onOpenMember={() => setOpenDonate(true)}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:programId" element={<ProgramDetailPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route
            path="/contact"
            element={<ContactPage onOpenContact={() => setOpenContact(true)} />}
          />
        </Routes>
      </main>
      <SiteFooter />

      <JoinProgramDialog
        open={openJoin}
        onOpenChange={setOpenJoin}
        onSubmitted={() => handleFormSubmitted("join")}
      />
      <DonateDialog
        open={openDonate}
        onOpenChange={setOpenDonate}
        onSubmitted={() => handleFormSubmitted("donate")}
      />
      <ContactDialog
        open={openContact}
        onOpenChange={setOpenContact}
        onSubmitted={() => handleFormSubmitted("contact")}
      />
    </GosecLayout>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <Routes>
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLoginPage />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/content"
              element={
                <ProtectedRoute>
                  <AdminContentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/programs"
              element={
                <ProtectedRoute>
                  <AdminProgramsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <AdminEventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute>
                  <AdminGalleryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/forms"
              element={
                <ProtectedRoute>
                  <AdminFormsPage />
                </ProtectedRoute>
              }
            />
            
            {/* Public site routes */}
            <Route path="/*" element={<PublicSite />} />
          </Routes>
          <Toaster richColors position="bottom-right" />
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
