import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaymentForm from "./pages/PaymentForm";
import SuccessPage from "./pages/SuccessPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import { useEffect, useState } from "react";
import { getCookie } from "./utils/helpers";

function App() {
  const [authenticated, setAuthenticated] = useState(null); // null means loading
  const token = getCookie("auth_token");
  const userRole = getCookie("user_role");
  useEffect(() => {
    setAuthenticated(token && userRole === "admin");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pay" element={<PaymentForm />} />
        <Route path="/success/:id" element={<SuccessPage />} />
        <Route path="/login" element={<Login setAuth={setAuthenticated} />} />
        <Route
          path="/"
          element={
            authenticated === false ? (
              <Navigate to="/login" />
            ) : (
              <AdminDashboard loading={authenticated === null} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
