import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Constants and utilities
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const generateToken = () =>
  `token_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;

const setCookie = (name, value, days = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
};

// Reusable Components
const ErrorAlert = ({ message }) => (
  <div
    className="flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
    role="alert"
  >
    <svg
      className="shrink-0 w-4 h-4 me-3"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <div>{message}</div>
  </div>
);

// eslint-disable-next-line no-unused-vars
const InputField = ({ id, label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-900 dark:text-white"
    >
      {label}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        id={id}
        {...props}
        className="w-full pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
    </div>
  </div>
);

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  show,
  toggleShow,
  disabled,
}) => (
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

// Main Component
export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 1000));

    if (
      formData.username === ADMIN_USERNAME &&
      formData.password === ADMIN_PASSWORD
    ) {
      const token = generateToken();
      setCookie("auth_token", token);
      setCookie("user_role", "admin");
      navigate("/admin");
    } else {
      setError("Invalid username or password. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-md p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h5>
          <p className="text-gray-700 dark:text-gray-400">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <ErrorAlert message={error} />}

          <InputField
            id="username"
            label="Username"
            icon={User}
            placeholder="Enter username"
            value={formData.username}
            onChange={(e) => handleChange("username")(e.target.value)}
            disabled={isLoading}
            required
          />

          <PasswordField
            id="password"
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            show={showPassword}
            toggleShow={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 cursor-pointer"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 bg-gray-100 p-3 rounded-lg">
          <p className="font-medium mb-1">Demo Credentials:</p>
          <p>
            Username: <span className="font-mono">admin</span>
          </p>
          <p>
            Password: <span className="font-mono">admin123</span>
          </p>
        </div>
      </div>
    </div>
  );
}
