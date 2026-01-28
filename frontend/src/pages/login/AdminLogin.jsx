import { useState } from "react";
import logo from "../../assets/icon.png";
import { adminLoginApi } from "../../auth/auth.api";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.password) newErrors.password = "Password is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateErrors = validate();
    setErrors(validateErrors);

    if (Object.keys(validateErrors).length !== 0) return;

    try {
      setLoading(true);
      const response = await adminLoginApi({
        email: formData.email,
        password: formData.password,
      });

      if (response?.token) {
        if (formData.rememberMe) {
          localStorage.setItem("adminToken", response.token);
        } else {
          sessionStorage.setItem("adminToken", response.token);
        }
      }
      navigate('/admin/dashboard');

    } catch (error) {
      setErrors({
        api:error?.response?.data?.message || "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="logo" className="h-20 w-20 object-contain" />
        </div>

        <h2 className="text-xl font-bold text-center mb-6">
          👋 Welcome back to Pulse-care
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2   focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input
                checked={formData.rememberMe}
                onChange={handleChange}
                type="checkbox"
                name="rememberMe"
                className="mr-2"
              />
              Remember me
            </label>

            <a
              href="/signup/admin"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          {errors.api && (
            <p className="text-red-500 text-sm text-center">{errors.api}</p>
          )}
          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4 font-semibold">
          Don't have an account?{" "}
          <a
            href="/signup/admin"
            className="text-blue-600 hover:underline font-semibold"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
