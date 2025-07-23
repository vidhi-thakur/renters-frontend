import { useEffect, useState } from "react";
import SelectField from "../components/SelectField";
import InputField from "../components/InputField";
import ErrorAlert from "../components/ErrorAlert";
import { paymentOptions } from "../utils/static";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentForm() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    buildingName: "",
    unitNumber: "",
    tenantName: "",
    amount: "",
    paymentMethod: "",
  });
  const [error, setError] = useState("");

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${apiUrl}/payments`, {
        building_name: formData.buildingName,
        unit_number: formData.unitNumber,
        tenant_name: formData.tenantName,
        amount: formData.amount,
        payment_method: formData.paymentMethod,
      });
      if (response.status !== 201) throw new Error("Failed to save payment");
      else if (response.status === 201) {
        navigate(`/success/${response.data.transaction_id}`, {
          state: { ...formData, transactionId: response.data.transaction_id },
        });
      }
    } catch (error) {
      const err = error.response?.data?.message || error.message;
      console.error(err);
      setError(
        err ||
          "An error occurred while processing your payment. Please try again."
      );
    }
  };

  useEffect(() => {
    if (!searchParams) return;
    setFormData({
      tenantName: searchParams.get("tenantName") || "",
      unitNumber: searchParams.get("unitNumber") || "",
      amount: searchParams.get("amount") || "",
      paymentMethod: searchParams.get("paymentMethod")?.toLowerCase() || "",
      buildingName: searchParams.get("buildingName") || "",
    });
  }, [searchParams]);

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
            {error && <ErrorAlert message={error} />}

            <InputField
              id="building-name"
              label="Building Name"
              placeholder="Enter building name"
              value={formData.buildingName}
              onChange={(e) => handleChange("buildingName")(e.target.value)}
              icon={null}
            />
            <InputField
              id="unit-number"
              label="Unit Number"
              placeholder="e.g., 101, A-205"
              value={formData.unitNumber}
              onChange={(e) => handleChange("unitNumber")(e.target.value)}
              icon={null}
            />
            <InputField
              id="tenant-name"
              label="Tenant Name"
              placeholder="Enter tenant full name"
              value={formData.tenantName}
              onChange={(e) => handleChange("tenantName")(e.target.value)}
              icon={null}
            />
            <InputField
              id="amount"
              label="Amount"
              placeholder="Enter amount in USD"
              type="number"
              value={formData.amount}
              onChange={(e) => handleChange("amount")(e.target.value)}
              icon={null}
            />
            <SelectField
              id="payment-method"
              label="Payment Method"
              options={paymentOptions}
              value={formData.paymentMethod}
              onChange={handleChange("paymentMethod")}
              default_value="Select payment method"
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
