import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaymentForm from "./pages/PaymentForm";
// import SuccessPage from "./pages/SuccessPage";
// import Login from "./pages/Login";
// import AdminDashboard from "./pages/AdminDashboard";
// import { useState } from "react";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pay" element={<PaymentForm />} />
        {/* <Route path="/success/:id" element={<SuccessPage />} />
        <Route path="/login" element={<Login setAuth={setAuthenticated} />} />
        <Route
          path="/admin"
          element={
            authenticated ? <AdminDashboard /> : <Navigate to="/login" />
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
