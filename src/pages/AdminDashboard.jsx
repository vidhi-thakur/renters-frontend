import { useEffect, useState } from "react";
import { Filter, LogOut, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteCookie,
  formatDate,
  formatPaymentMethod,
  getCookie,
  getUniqueBuildings,
} from "../utils/helpers";

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

const FilterBar = ({ payments, filters, setFilters }) => {
  return (
    <div className="mb-6 mx-auto p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div>
        <h5 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
          <Filter className="w-5 h-5" />
          Filters
        </h5>
        <p className="text-gray-700 dark:text-gray-400">
          Filter payments by building, date range, or search terms
        </p>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="search"
            >
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="search"
                placeholder="Tenant, unit, or transaction ID"
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }))
                }
                className="pl-10 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="building"
            >
              Building
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={filters.building}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, building: value }))
              }
              required
              id="building"
            >
              <option value="">All buildings</option>
              {getUniqueBuildings(payments).map((building) => (
                <option key={building} value={building}>
                  {building}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="date-from"
            >
              From Date
            </label>
            <input
              className="w-full pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="date-from"
              type="date"
              value={filters.dateFrom}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateFrom: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="date-to"
            >
              To Date
            </label>
            <input
              className="w-full pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="date-to"
              type="date"
              value={filters.dateTo}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
              }
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() =>
              setFilters({
                building: "",
                dateFrom: "",
                dateTo: "",
                search: "",
              })
            }
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentsTable = ({
  payments,
  toggleVerified,
  formatDate,
  formatPaymentMethod,
  filteredPayments,
}) => {
  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div>
        <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Records
        </h5>
        <p className="text-gray-700 dark:text-gray-400">
          Showing {filteredPayments.length} of {payments.length} payments
        </p>
      </div>
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 w-16">
                  S.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Building
                </th>
                <th scope="col" className="px-6 py-3">
                  Unit
                </th>
                <th scope="col" className="px-6 py-3">
                  Tenant Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Transaction ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Verified
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={payment.id}
                >
                  <td className="font-medium px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{payment.building_name}</td>
                  <td className="px-6 py-4">{payment.unit_number}</td>
                  <td className="px-6 py-4">{payment.tenant_name}</td>
                  <td className="px-6 py-4">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                      variant="outline"
                    >
                      {formatPaymentMethod(payment.payment_method)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {payment.transaction_id}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <label className="inline-flex items-center me-5 cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={payment.verified}
                          onChange={() => toggleVerified(payment.id)}
                          aria-label={`Toggle verification for ${payment.tenant_name}`}
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          <span
                            className={`${
                              payment.verified
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                : " bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                            }  text-xs font-medium me-2 px-2.5 py-0.5 rounded-full `}
                          >
                            {payment.verified ? "Verified" : "Pending"}
                          </span>
                        </span>
                      </label>
                    </div>
                  </td>
                  <td className="text-sm text-gray-600">
                    {formatDate(payment.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No payments found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function AdminPage() {
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

  // Mock payment data
  const mockPayments = [
    {
      id: 1,
      building_name: "Sunset Apartments",
      unit_number: "101",
      tenant_name: "John Smith",
      amount: 1200.0,
      payment_method: "credit-card",
      transaction_id: "TXN-1704067200-ABC123DEF",
      verified: true,
      created_at: "2024-01-15T10:30:00Z",
    },
    {
      id: 2,
      building_name: "Oak Tower",
      unit_number: "A-205",
      tenant_name: "Sarah Johnson",
      amount: 1500.5,
      payment_method: "bank-transfer",
      transaction_id: "TXN-1704153600-XYZ789GHI",
      verified: false,
      created_at: "2024-01-16T14:20:00Z",
    },
    {
      id: 3,
      building_name: "Sunset Apartments",
      unit_number: "203",
      tenant_name: "Michael Brown",
      amount: 1100.0,
      payment_method: "check",
      transaction_id: "TXN-1704240000-JKL456MNO",
      verified: true,
      created_at: "2024-01-17T09:15:00Z",
    },
    {
      id: 4,
      building_name: "Pine Ridge",
      unit_number: "B-12",
      tenant_name: "Emily Davis",
      amount: 1350.75,
      payment_method: "online-payment",
      transaction_id: "TXN-1704326400-PQR789STU",
      verified: false,
      created_at: "2024-01-18T16:45:00Z",
    },
    {
      id: 5,
      building_name: "Oak Tower",
      unit_number: "C-301",
      tenant_name: "David Wilson",
      amount: 1800.0,
      payment_method: "credit-card",
      transaction_id: "TXN-1704412800-VWX123YZA",
      verified: true,
      created_at: "2024-01-19T11:30:00Z",
    },
    {
      id: 6,
      building_name: "Pine Ridge",
      unit_number: "A-05",
      tenant_name: "Lisa Anderson",
      amount: 950.25,
      payment_method: "cash",
      transaction_id: "TXN-1704499200-BCD456EFG",
      verified: false,
      created_at: "2024-01-20T13:20:00Z",
    },
  ];

  const handleLogout = () => {
    deleteCookie("auth_token");
    deleteCookie("user_role");
    navigate("/login");
  };

  const toggleVerified = (paymentId) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId
          ? { ...payment, verified: !payment.verified }
          : payment
      )
    );
    // API call to update payment verification status can be added here
  };

  useEffect(() => {
    const token = getCookie("auth_token");
    const userRole = getCookie("user_role");

    if (token && userRole === "admin") {
      setIsAuthenticated(true);
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
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
        />
        <PaymentsTable
          payments={payments}
          toggleVerified={toggleVerified}
          formatDate={formatDate}
          formatPaymentMethod={formatPaymentMethod}
          filteredPayments={filteredPayments}
        />
      </div>
    </div>
  );
}
