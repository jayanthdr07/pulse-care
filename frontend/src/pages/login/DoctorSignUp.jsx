import { useState } from "react";
import logo from "../../assets/icon.png";
import bg from "../../assets/bg1.jpg";
import { doctorSignupApi } from "../../auth/auth.api";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const DoctorSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",

    doctorId: "",
    licenseNumber: "",
    specialization: "",
    department: "",
    qualification: "",
    yearsOfExperience: "",

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

    if (!formData.doctorId)
      newErrors.doctorId = "Doctor ID is required (hospital ID).";

    if (!formData.licenseNumber)
      newErrors.licenseNumber = "Medical license/registration number is required.";

    if (!formData.specialization)
      newErrors.specialization = "Specialization is required.";

    if (!formData.department) newErrors.department = "Department is required.";

    if (!formData.qualification)
      newErrors.qualification = "Qualification is required.";

    if (!formData.yearsOfExperience)
      newErrors.yearsOfExperience = "Years of experience is required.";
    else if (!/^\d+$/.test(String(formData.yearsOfExperience)))
      newErrors.yearsOfExperience = "Years of experience must be a number.";

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
        const response = await doctorSignupApi(formData);
        console.log("Doctor signup successful:", response);

        if (response?.token) {
          localStorage.setItem("token", response.token);
        }

        navigate("/doctor/dashboard");
      } catch (err) {
        console.error(
          "Doctor signup error:",
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
          Doctor Registration - Pulse-care
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Please fill in your professional details as per hospital and medical
          council records.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                name="fullName"
                placeholder="e.g. Dr. Jane Smith"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>

            {/* Doctor ID */}
            <div>
              <label className="block text-sm font-medium mb-1">Doctor ID</label>
              <input
                value={formData.doctorId}
                onChange={handleChange}
                type="text"
                name="doctorId"
                placeholder="Hospital-issued doctor ID"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.doctorId && (
                <p className="text-red-500 text-sm">{errors.doctorId}</p>
              )}
            </div>

            {/* Work Email */}
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contact number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* License Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                License / Registration No.
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="Medical council registration number"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.licenseNumber && (
                <p className="text-red-500 text-sm">{errors.licenseNumber}</p>
              )}
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Specialization
              </label>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Specialization</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Radiology">Radiology</option>
                <option value="Anesthesiology">Anesthesiology</option>
                <option value="Surgery">Surgery</option>
                <option value="Other">Other</option>
              </select>
              {errors.specialization && (
                <p className="text-red-500 text-sm">{errors.specialization}</p>
              )}
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
                <option value="OPD">OPD</option>
                <option value="Emergency">Emergency</option>
                <option value="ICU">ICU</option>
                <option value="Surgery">Surgery</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Radiology">Radiology</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Others">Others</option>
              </select>
              {errors.department && (
                <p className="text-red-500 text-sm">{errors.department}</p>
              )}
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. MBBS, MD"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.qualification && (
                <p className="text-red-500 text-sm">{errors.qualification}</p>
              )}
            </div>

            {/* Years of Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                placeholder="e.g. 5"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.yearsOfExperience && (
                <p className="text-red-500 text-sm">{errors.yearsOfExperience}</p>
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

          {/* Confirm Password */}
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

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm">
              I confirm the above details are correct and agree to the Terms &
              Conditions.
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm">{errors.terms}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition ${
              (!formData.terms || isSubmitting)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={!formData.terms || isSubmitting}
          >
            {isSubmitting ? "Creating Doctor Account..." : "Create Doctor Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4 font-semibold">
          Already registered as a doctor?{" "}
          <a
            href="/login/doctor"
            className="text-blue-600 hover:underline font-semibold"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default DoctorSignUp;