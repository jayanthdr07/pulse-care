import { useState } from "react";
import logo from "../../assets/icon.png";
import bg from "../../assets/bg1.jpg";
import { staffSignupApi } from "../../auth/auth.api";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const StaffSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    staffId: "",
    department: "",
    role: "",
    gender: "",
    dateOfBirth: "",
    shift: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength("");
      return;
    }
    if (password.length <= 6) setPasswordStrength("Weak");
    else if (password.length <= 10) setPasswordStrength("Medium");
    else setPasswordStrength("Strong");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) newErrors.fullName = "Full Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";

    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.staffId)
      newErrors.staffId = "Staff ID is required for hospital staff.";

    if (!formData.department)
      newErrors.department = "Department is required.";

    if (!formData.role) newErrors.role = "Role is required.";

    if (!formData.terms)
      newErrors.terms = "You must accept the terms and conditions.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setIsSubmitting(true);
        const response = await staffSignupApi(formData);
        console.log("Staff signup successful:", response);

        // If backend returns a token or similar, you can store it here.
        if (response?.token) {
          localStorage.setItem("token", response.token);
        }

        navigate("/staff/dashboard");
      } catch (err) {
        console.error(
          "Staff signup error:",
          err?.response?.data?.message || err.message
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 bg-center bg-cover"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="logo"
            className="h-24 w-24 object-contain rounded-full border p-1"
          />
        </div>

        <h2 className="font-bold text-xl flex justify-center mb-4">
          Staff Registration - Pulse-care
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Please provide complete staff details as maintained by the hospital HR
          (name, ID, role, department, and contact information).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                name="fullName"
                placeholder="e.g. Dr. John Doe"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Staff ID */}
            <div>
              <label className="block text-sm font-medium mb-1">Staff ID</label>
              <input
                value={formData.staffId}
                onChange={handleChange}
                type="text"
                name="staffId"
                placeholder="Hospital-issued staff ID"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.staffId && (
                <p className="text-red-500 text-sm">{errors.staffId}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Work Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@hospital.org"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Emergency/Contact number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Emergency">Emergency</option>
                <option value="OPD">OPD</option>
                <option value="ICU">ICU</option>
                <option value="Surgery">Surgery</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Radiology">Radiology</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Administration">Administration</option>
                <option value="Others">Others</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">{errors.department}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Pharmacist">Pharmacist</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Billing Staff">Billing Staff</option>
                <option value="Support Staff">Support Staff</option>
                <option value="Other">Other</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender (optional)</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Shift */}
            <div>
              <label className="block text-sm font-medium mb-1">Shift</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Shift (optional)</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
                <option value="Night">Night</option>
                <option value="Rotational">Rotational</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            <p className="text-sm text-gray-500 mt-1">
              Strength: {passwordStrength || "—"}
            </p>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm">
              I confirm that the above details match the records maintained by
              the hospital and agree to the Terms & Conditions.
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              (!formData.terms || isSubmitting) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!formData.terms || isSubmitting}
          >
            {isSubmitting ? "Creating Staff Account..." : "Create Staff Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4 font-semibold">
          Already registered as staff?{" "}
          <a
            href="/login/staff"
            className="text-blue-600 hover:underline font-semibold"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default StaffSignUp;