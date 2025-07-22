import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  show,
  toggleShow,
  disabled,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Enter password"
          required
          className="w-full pl-10 pr-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <span
          className="absolute right-0 top-0 h-full px-3 grid place-items-center cursor-pointer"
          onClick={toggleShow}
        >
          {show ? (
            <EyeOff className="w-4 h-4 text-gray-400" />
          ) : (
            <Eye className="w-4 h-4 text-gray-400" />
          )}
        </span>
      </div>
    </div>
  );
}
