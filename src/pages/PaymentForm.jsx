import { useState } from "react";

function InputField({
  id,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      />
    </div>
  );
}

function SelectField({ id, label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      >
        <option value="">Select payment method</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    buildingName: "",
    unitNumber: "",
    tenantName: "",
    amount: "",
    paymentMethod: "",
  });

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const paymentOptions = [
    { value: "cash", label: "Cash" },
    { value: "check", label: "Check" },
    { value: "credit-card", label: "Credit Card" },
    { value: "debit-card", label: "Debit Card" },
    { value: "bank-transfer", label: "Bank Transfer" },
    { value: "online-payment", label: "Online Payment" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="p-6 bg-white border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Payment Information
          </h5>
          <p className="text-center text-gray-700 dark:text-gray-400 mb-6">
            Please fill out the payment details below
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              id="building-name"
              label="Building Name"
              placeholder="Enter building name"
              value={formData.buildingName}
              onChange={handleChange("buildingName")}
            />
            <InputField
              id="unit-number"
              label="Unit Number"
              placeholder="e.g., 101, A-205"
              value={formData.unitNumber}
              onChange={handleChange("unitNumber")}
            />
            <InputField
              id="tenant-name"
              label="Tenant Name"
              placeholder="Enter tenant full name"
              value={formData.tenantName}
              onChange={handleChange("tenantName")}
            />
            <InputField
              id="amount"
              label="Amount"
              placeholder="Enter amount in USD"
              type="number"
              value={formData.amount}
              onChange={handleChange("amount")}
            />
            <SelectField
              id="payment-method"
              label="Payment Method"
              options={paymentOptions}
              value={formData.paymentMethod}
              onChange={handleChange("paymentMethod")}
            />
            <button
              type="submit"
              className="w-full cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Submit Payment Information
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
