import "./App.css";
import Stats from "./components/routes-component/stats.component";
import Jobs from "./components/routes-component/jobs.component";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login.component";
import ProtectedRoute from "./components/routes-component/protected-route";
import SignUp from "./components/sign-up/sign-up-component";
import Navbar from "./components/navigation/nav-bar-component";
import IndeedJobs from "./components/onLine-jobs/indeed-lobs-component";
import GlassdoorJobs from "./components/onLine-jobs/glass-door-jobs.component";
import LinkedInJobs from "./components/onLine-jobs/linkedIn-jobs-component";
import AllJobs from "./components/my-jobs/all-my-jobs-component";
import WaitingJobs from "./components/my-jobs/waiting-jobs-component";
import AppliedJobs from "./components/my-jobs/applied-jobs-component";
import InterviewScheduled from "./components/my-jobs/interview-scheduled-component";
import Interviewed from "./components/my-jobs/interviewed-jobs-component";
import Declined from "./components/my-jobs/declined-jobs-component";
import AcceptedJobs from "./components/my-jobs/accepted-jobs-component";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Stats />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <AllJobs />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/indeed-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <IndeedJobs />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/glassdoor-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <GlassdoorJobs />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/linkedIn-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <LinkedInJobs />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/waiting-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <WaitingJobs />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/applied-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <AppliedJobs />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview-scheduled-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <InterviewScheduled />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/interviewed-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Interviewed />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/declined-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Declined />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/accepted-jobs"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <AcceptedJobs />
            </>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Jobs />
            </>
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
