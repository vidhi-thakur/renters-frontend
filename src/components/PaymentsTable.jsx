import { formatDate, formatPaymentMethod } from "../utils/helpers";

export default function PaymentsTable({
  payments,
  toggleVerified,
  filteredPayments,
}) {
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
                  <td className="px-6 py-4">${(+payment.amount).toFixed(2)}</td>
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
                          onChange={(e) =>
                            toggleVerified(payment.id, e.target.checked)
                          }
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
                  <td className="text-sm text-gray-600 px-6 py-4">
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
}
