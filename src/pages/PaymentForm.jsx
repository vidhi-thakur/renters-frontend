import { useState } from "react";

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    buildingName: "",
    unitNumber: "",
    tenantName: "",
    amount: "",
    paymentMethod: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="space-y-1">
            <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Payment Information
            </h5>
            <p className="text-center font-normal text-gray-700 dark:text-gray-400">
              Please fill out the payment details below
            </p>
          </div>
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="building-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Building Name
                </label>
                <input
                  id="building-name"
                  type="text"
                  placeholder="Enter building name"
                  value={formData.buildingName}
                  onChange={(e) =>
                    handleInputChange("buildingName", e.target.value)
                  }
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="unit-number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Unit Number
                </label>
                <input
                  id="unit-number"
                  type="text"
                  placeholder="e.g., 101, A-205"
                  value={formData.unitNumber}
                  onChange={(e) =>
                    handleInputChange("unitNumber", e.target.value)
                  }
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tenant-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tenant Name
                </label>
                <input
                  id="tenant-name"
                  type="text"
                  placeholder="Enter tenant full name"
                  value={formData.tenantName}
                  onChange={(e) =>
                    handleInputChange("tenantName", e.target.value)
                  }
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter amount in USD"
                    required
                    value={formData.amount}
                    onChange={(e) =>
                      handleInputChange("amount", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="payment-method">Payment Method</label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                  <option value="credit-card">Credit Card</option>
                  <option value="debit-card">Debit Card</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="online-payment">Online Payment</option>
                </select>
              </div>
              <button
                type="submit"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full"
              >
                Submit Payment Information
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
