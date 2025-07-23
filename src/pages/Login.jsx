import { useState } from "react";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { setCookie } from "../utils/helpers";
import axios from "axios";
import ErrorAlert from "../components/ErrorAlert";

// Main Component
export default function LoginPage({ setAuth }) {
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
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth`,
        {
          username: formData.username,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        const { user_token, user_role } = response.data;
        setCookie("auth_token", user_token);
        setCookie("user_role", user_role);
        setAuth(true);
        navigate("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
