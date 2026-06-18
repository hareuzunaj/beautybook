export const API_BASE = import.meta.env.DEV
  ? "http://127.0.0.1:8090/api"
  : "/phpligjeratat/pf-bb/api";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || "Request failed.");
  }

  return data;
}

export const api = {
  services: () => apiRequest("/services.php"),
  appointments: (phone = "") => {
    const query = phone ? `?phone=${encodeURIComponent(phone)}` : "";
    return apiRequest(`/appointments.php${query}`);
  },
  createAppointment: (payload) =>
    apiRequest("/appointments.php", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  updateAppointmentStatus: (id, status) =>
    apiRequest("/appointments.php", {
      method: "PATCH",
      body: JSON.stringify({ id, status })
    }),
  deleteAppointment: (id) =>
    apiRequest(`/appointments.php?id=${encodeURIComponent(id)}`, {
      method: "DELETE"
    })
};
