import { CheckCircle, Copy, Home, Receipt } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function TransactionIdSection({ transactionId }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(transactionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">
          Transaction ID
        </span>
        <button
          onClick={handleCopy}
          className="h-8 px-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm py-2.5"
        >
          <Copy className="w-4 h-4" />
          <span className="sr-only">Copy transaction ID</span>
        </button>
      </div>
      <div className="font-mono text-sm bg-white p-3 rounded border break-all text-gray-600">
        {transactionId}
      </div>
      {copied && (
        <p className="text-xs text-green-600 text-center">
          Transaction ID copied to clipboard!
        </p>
      )}
    </div>
  );
}

function PaymentDetails({ tenantName, amount, date }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Payment Details</h3>
      <div className="space-y-2 text-sm">
        {tenantName && <DetailItem label="Tenant Name" value={tenantName} />}
        {amount && <DetailItem label="Amount" value={`$${amount}`} />}
        <DetailItem label="Date & Time" value={date} />
        <DetailItem
          label="Status"
          value="Completed"
          valueClass="text-green-600"
        />
      </div>
    </div>
  );
}

function DetailItem({ label, value, valueClass = "text-gray-600" }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Link
        to="/pay"
        className="flex-1 flex items-center justify-center text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5"
      >
        <Home className="w-4 h-4 mr-2" />
        New Payment
      </Link>
      <button
        onClick={() => window.print()}
        className="flex-1 flex items-center justify-center bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg text-sm px-5 py-2.5"
      >
        <Receipt className="w-4 h-4 mr-2" />
        Print Receipt
      </button>
    </div>
  );
}

export default function SuccessPage({
  transactionId = "iojiojgre657",
  amount = "100.00",
  tenantName = "John Doe",
}) {
  const currentDate = new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="block max-w-sm p-6 bg-white border rounded-lg shadow-sm">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h5 className="text-2xl font-bold text-green-800">
              Payment Successful!
            </h5>
            <p className="text-gray-700">
              Your payment has been processed successfully
            </p>
          </div>

          <div className="space-y-6 mt-6">
            <TransactionIdSection transactionId={transactionId} />
            <PaymentDetails
              tenantName={tenantName}
              amount={amount}
              date={currentDate}
            />
            <div className="border-t pt-6">
              <ActionButtons />
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
              Keep this transaction ID for your records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
