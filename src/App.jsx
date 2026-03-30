import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import JobDashboard from "./pages/JobDashboard";
import CandidateProfile from "./pages/CandidateProfile";
import AnalyticsPage from "./pages/AnalyticsPage";
import HiringPage from "./pages/HiringPage";
import SettingsPage from "./pages/SettingsPage";
import Billing from "./pages/Billing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"                       element={<LandingPage />} />
          <Route path="/dashboard"              element={<LandingPage />} />
          <Route path="/jobs/:jobId"            element={<JobDashboard />} />
          <Route path="/candidate/:candidateId" element={<CandidateProfile />} />
          <Route path="/analytics"              element={<AnalyticsPage />} />
          <Route path="/hiring"                 element={<HiringPage />} />
          <Route path="/settings"               element={<SettingsPage />} />
          <Route path="/billing"               element={<Billing />} />
          <Route path="*"                       element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
