import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteCookie, getCookie, getUniqueBuildings } from "../utils/helpers";
import { mockPayments } from "../utils/static";
import FilterBar from "../components/FilterBar";
import PaymentsTable from "../components/PaymentsTable";
import axios from "axios";

const Header = ({ filteredPayments, handleLogout }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Payment Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage and verify tenant payments
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
              {filteredPayments.length} payments
            </span>
            <button
              className="flex items-center justify-evenly text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [filters, setFilters] = useState({
    building: "",
    dateFrom: "",
    dateTo: "",
    search: "",
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("auth_token");
    deleteCookie("user_role");
    navigate("/login");
  };

  const toggleVerified = async (paymentId, checked) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId ? { ...payment, verified: checked } : payment
      )
    );
    try {
      const response = await axios.patch(`${apiUrl}/payments`, {
        verified: checked,
        id: paymentId,
      });
      if (response.status !== 200) throw new Error("Failed to fetch payments");
    } catch (error) {
      console.error("Failed to verify payments:", error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/payments`);
      if (response.status !== 200) throw new Error("Failed to fetch payments");
      setPayments(response.data);
      setFilteredPayments(response.data);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setPayments(mockPayments); // Fallback to mock data in case of error
      setFilteredPayments(mockPayments);
    }
  };

  useEffect(() => {
    const token = getCookie("auth_token");
    const userRole = getCookie("user_role");
    if (token && userRole === "admin") {
      setIsAuthenticated(true);
      fetchPayments();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    let filtered = payments;

    // Filter by building
    if (filters.building) {
      filtered = filtered.filter((p) => p.building_name === filters.building);
    }

    // Filter by date range
    if (filters.dateFrom) {
      filtered = filtered.filter(
        (p) => new Date(p.created_at) >= new Date(filters.dateFrom)
      );
    }
    if (filters.dateTo) {
      filtered = filtered.filter(
        (p) => new Date(p.created_at) <= new Date(filters.dateTo)
      );
    }

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.tenant_name.toLowerCase().includes(searchTerm) ||
          p.unit_number.toLowerCase().includes(searchTerm) ||
          p.transaction_id.toLowerCase().includes(searchTerm) ||
          p.building_name.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredPayments(filtered);
  }, [payments, filters]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header filteredPayments={filteredPayments} handleLogout={handleLogout} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          payments={payments}
          filters={filters}
          setFilters={setFilters}
          building_options={getUniqueBuildings(payments)}
        />
        <PaymentsTable
          payments={payments}
          toggleVerified={toggleVerified}
          filteredPayments={filteredPayments}
        />
      </div>
    </div>
  );
}
