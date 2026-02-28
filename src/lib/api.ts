const BASE_URL = "http://localhost:5000";

const getAuthHeader = () => {
  const token = localStorage.getItem("adminToken");
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

export const api = {
  async get(endpoint: string) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          ...getAuthHeader(),
        },
      });
      if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || error.error || `Request failed with status ${response.status}`);
      }
      return response.json();
    } catch (e: any) {
      console.error(`GET ${BASE_URL}${endpoint} failed:`, e);
      throw e;
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || error.error || `Request failed with status ${response.status}`);
      }
      return response.json();
    } catch (e: any) {
      console.error(`POST ${BASE_URL}${endpoint} failed:`, e);
      throw e;
    }
  },

  async put(endpoint: string, data: any) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || error.error || `Request failed with status ${response.status}`);
      }
      return response.json();
    } catch (e: any) {
      console.error(`PUT ${BASE_URL}${endpoint} failed:`, e);
      throw e;
    }
  },

  async patch(endpoint: string, data: any) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || error.error || `Request failed with status ${response.status}`);
      }
      return response.json();
    } catch (e: any) {
      console.error(`PATCH ${BASE_URL}${endpoint} failed:`, e);
      throw e;
    }
  },

  async delete(endpoint: string) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "DELETE",
        headers: {
          ...getAuthHeader(),
        },
      });
      if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.message || error.error || `Request failed with status ${response.status}`);
      }
      return response.json();
    } catch (e: any) {
      console.error(`DELETE ${BASE_URL}${endpoint} failed:`, e);
      throw e;
    }
  },
};
