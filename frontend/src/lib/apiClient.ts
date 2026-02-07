export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new ApiError(response.status, "Session expired. Please login again.");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Request failed with status ${response.status}`
    );
  }
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return undefined as T;
  }

  return response.json();
}
