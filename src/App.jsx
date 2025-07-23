import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaymentForm from "./pages/PaymentForm";
import SuccessPage from "./pages/SuccessPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/helpers";
import Home from "./pages/Home";

function App() {
  const [authenticated, setAuthenticated] = useState(null); // null means loading
  const token = getCookie("auth_token");
  const userRole = getCookie("user_role");
  useEffect(() => {
    if (token && userRole === "admin") {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pay" element={<PaymentForm />} />
        <Route path="/success/:id" element={<SuccessPage />} />
        <Route path="/login" element={<Login setAuth={setAuthenticated} />} />
        <Route
          path="/admin"
          element={
            authenticated === false ? (
              <Navigate to="/login" />
            ) : (
              <AdminDashboard loading={authenticated === null} token={token} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
