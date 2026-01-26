import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearSelectedRole, loadSelectedRole, saveSelectedRole } from "./auth.storage";
import { getDashboardPath } from "./auth.routes";
import { adminLoginApi, adminSignupApi, doctorLoginApi, doctorSignupApi, fetchMeApi, logoutApi, staffLoginApi, staffSignupApi } from "./auth.api";



export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const setRole = (role) => {
    setSelectedRole(role);
    saveSelectedRole(role);
  };

  const persistUser = (user) => {
    setUser(user);
    navigate(getDashboardPath(user.role), { replace: true });
  };

  const doctorSignup = async (data) => {
    const res = await doctorSignupApi(data);
    persistUser(res.user);
  };

  const staffSignup = async (data) => {
    const res = await staffSignupApi(data);
    persistUser(res.user);
  };

  const adminSignup = async (data) => {
    const res = await adminSignupApi(data);
    persistUser(res.user);
  };

  const doctorLogin = async (data) => {
    const res = await doctorLoginApi(data);
    persistUser(res.user)
  };

  const staffLogin = async (data) => {
    const res = await staffLoginApi(data);
    persistUser(res.user);
  };

  const adminLogin = async (data) => {
    const res = await adminLoginApi(data);
    persistUser(res.user);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
    setSelectedRole(null);
    clearSelectedRole();
    navigate("/role-select", { replace: true });
  };

  // restores sessions from HttpOnly cookies

  useEffect(() => {
    const init = async () => {
      try {
        const me = await fetchMeApi();
        if (me) {
          setUser(me);
          navigate(getDashboardPath(me.role), {
            replace: true
          });
        }
      } catch (err) {
        console.error("Session restore failed", err);
        
      } finally {
        const role = loadSelectedRole();
        if (role) setSelectedRole(role);
        setLoading(false);
      }
    };
    init();
  }, [navigate]);

  return (
    <AuthContext.Provider
    value={{
      user,
      selectedRole,
      loading,
      setSelectedRole: setRole,
      doctorSignup,
      staffSignup,
      adminSignup,
      doctorLogin, 
      staffLogin,
      adminLogin,
      logout
    }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}