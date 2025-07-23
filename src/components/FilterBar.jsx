import InputField from "./InputField";
import SelectField from "./SelectField";
import { Filter, Search } from "lucide-react";

export default function FilterBar({ building_options, filters, setFilters }) {
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
          <InputField
            id="search"
            label="Search"
            icon={Search}
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

          <SelectField
            id="building"
            label="Building"
            options={building_options}
            value={filters.building}
            onChange={(value) =>
              setFilters((prev) => ({ ...prev, building: value }))
            }
            default_value="All buildings"
          />
          <InputField
            id="date-from"
            label="From Date"
            type="date"
            value={filters.dateFrom}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                dateFrom: e.target.value,
              }))
            }
            icon={null}
          />
          <InputField
            id="date-to"
            label="To Date"
            type="date"
            value={filters.dateTo}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                dateTo: e.target.value,
              }))
            }
            icon={null}
          />
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
}
