const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const jsonPost = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "include", // Http only cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Auth request failed");
  }
  return res.json();
};

export const doctorSignupApi = (data) =>
  jsonPost(`${BASE_URL}/auth/doctor/signup`, data);

export const staffSignupApi = (data) =>
  jsonPost(`${BASE_URL}/auth/staff/signup`, data);

export const adminSignupApi = (data) =>
  jsonPost(`${BASE_URL}/auth/admin/signup`, data);

export const doctorLoginApi = (data) =>
  jsonPost(`${BASE_URL}/auth/doctor/login`, data);

export const staffLoginApi = (data) => jsonPost(`${BASE_URL}/auth/staff/login`, data);

export const adminLoginApi = (data) => jsonPost(`${BASE_URL}/auth/admin/login`, data);

// user API

export const fetchMeApi = async () => {
  // If backend is down/unreachable, don't crash the app on boot.
  try {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) return null;
    if (!res.ok) throw new Error("Failed to restore session");

    return res.json();
  } catch {
    // Network errors (e.g. ERR_CONNECTION_REFUSED) should behave like "not logged in".
    return null;
  }
};

// Logout API test

export const logoutApi = async () => {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};
