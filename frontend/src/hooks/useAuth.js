import { useContext } from "react"
import { AuthContext } from "../auth/authContext"


export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};