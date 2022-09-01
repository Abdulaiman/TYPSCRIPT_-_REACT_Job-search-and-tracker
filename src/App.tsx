import "./App.css";
import Home from "./components/routes-component/home.component";
import Jobs from "./components/routes-component/jobs.component";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/login.component";
import ProtectedRoute from "./components/routes-component/protected-route";
import SignUp from "./components/sign-up/sign-up-component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute>{<Home />}</ProtectedRoute>} />
      <Route
        path="/jobs"
        element={<ProtectedRoute>{<Jobs />}</ProtectedRoute>}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
