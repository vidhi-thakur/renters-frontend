import { QRCodeCanvas } from "qrcode.react";

export default function Home() {
  const tenant = {
    tenantName: "John Doe",
    unitNumber: "A-101",
    amount: 12500,
    buildingName: "Sunshine Apartments",
    paymentMethod: "upi",
  };

  const query = new URLSearchParams(tenant).toString();
  const paymentUrl = `https://renters-frontend.vercel.app/pay?${query}`;
  console.log("Payment URL:", paymentUrl);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="grid place-items-center max-w-sm p-6 bg-white border rounded-lg shadow-sm">
          <h5 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            Scan to Pay
          </h5>
          <p className="text-center text-gray-700 dark:text-gray-400 mb-6">
            Scan the QR code below to pay your rent
          </p>
          <QRCodeCanvas value={paymentUrl} size={150} />
        </div>
      </div>
    </div>
  );
}
