export const getDashboardPath = (role) => {
  switch (role) {
    case "doctor":
      return "/doctor/dashboard";
    case "staff":
      return "/staff/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/role-select";
  }
};