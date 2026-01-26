export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  role?: string;
}

const BASE_API_URL = "http://localhost:8080/auth";

const AuthApi = {
  login: async (credentials: LoginRequest): Promise<void> => {
    const response = await fetch(`${BASE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error("Invalid username or password");
      }
      throw new Error("Failed to login. Please try again.");
    }
  },

  logout: async () => {
    await fetch(`${BASE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  },
};

export default AuthApi;
