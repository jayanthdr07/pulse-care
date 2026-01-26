
import logo from "../assets/icon.png";
import { useNavigate } from "react-router-dom";
import { User, Building2, Stethoscope } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const RoleSelect = () => {
  const navigate = useNavigate();
  const { setSelectedRole} = useAuth();

  const goDoctor = () => {
    setSelectedRole("doctor");
    navigate("/signup/doctor");
  };

  const goStaff = () => {
    setSelectedRole("staff");
    navigate("/signup/staff");
  };

  const goAdmin = () => {
    setSelectedRole("admin");
    navigate("/signup/admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col ">
      {/* Top navigation Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-gray-200 p-1 flex items-center justify-center bg-white shadow-sm">
            <img
              src={logo}
              alt="Pulse Care Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-800">
            Pulse<span className="text-blue-600">Care</span>
          </span>
        </div>

        <div className="hidden md:block text-sm text-slate-400 font-medium">
          Healthcare Excellence System
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-linear-to-b from white to-blue-50">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500">
              Please Select your role to continue
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Staff Button */}
            <button
              onClick={goStaff}
              className="group flex items-center p-5 bg-white border border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 rounded-2xl shadow-sm"
            >
              <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Building2
                  size={28}
                  className="text-blue-600 group-hover:text-white"
                />
              </div>
              <div className="ml-5 text-left">
                <p className="font-bold text-lg text-slate-800">Staff</p>
                <p className="text-sm text-slate-500">
                  Front desk & operations
                </p>
              </div>
            </button>

            {/* Admin button */}
            <button
              onClick={goAdmin}
              className="group flex items-center p-5 bg-white border border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all duration-300 rounded-2xl shadow-sm"
            >
              <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-all">
                <User
                  size={28}
                  className="text-green-600 group-hover:text-white"
                />
              </div>
              <div className="ml-5 text-left">
                <p className="font-bold text-lg text-slate-800">Admin / User</p>
                <p className="text-sm text-slate-500">
                  Access your medical records
                </p>
              </div>
            </button>

            {/* Doctor Button */}
            <button
              onClick={goDoctor}
              className="group flex items-center p-5 bg-white border border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 rounded-2xl shadow-sm"
            >
              <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Stethoscope
                  size={28}
                  className="text-purple-600 group-hover:text-white"
                />
              </div>
              <div className="ml-5 text-left">
                <p className="font-bold text-lg text-slate-800">
                  Medical Doctor
                </p>
                <p className="text-sm text-slate-500">
                  View appointments & patients
                </p>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelect;
