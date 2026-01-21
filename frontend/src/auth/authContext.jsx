import { createContext, useEffect, useState } from "react";
import { clearToken, getToken, setToken } from "../utils/tokenUtils";
import { getProfileApi, loginApi } from "../api/authApi";


export const AuthContext = createContext();

export function AuthProvider({ children}) {
  const [token, setAuthToken] = useState(getToken());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //On web load: try to fetch profile if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const profile = await getProfileApi();
          setUser(profile);
        } catch  {
          clearToken();
          setAuthToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [token]);

  const login = async (email, password) => {
    const res = await loginApi(email, password);

    setToken(res.token);
    setAuthToken(res.token);
    setUser({
      name: res.name,
      role: res.role
    });
    return res.role // used for redirect to role [user, doctor, staff]
  };

  const logout = () => {
    clearToken();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
    value={{
      token,
      user,
      isAuthenticated: !!token,
      loading,
      login,
      logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}