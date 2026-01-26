const ROLE_KEY = "pulsecare_selected_role";

export const saveSelectedRole = (role) => 
  localStorage.setItem(ROLE_KEY, role);

export const loadSelectedRole = () => 
  localStorage.getItem(ROLE_KEY);

export const clearSelectedRole = () =>
  localStorage.removeItem(ROLE_KEY);