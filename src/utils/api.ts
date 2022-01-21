
const baseURL = 'https://api.themoviedb.org/3'

export const apiToken = 'a99cc60fc2b34dbb18cb806b8a88ed14'

const headers = {
  'Content-Type': 'application/json',
};

/**
 * Default handling to all responses
 */
const handleResponse = async (rawResponse: Response) => {

  const response: any = await rawResponse.json();

  // Check for errors
  if (response.error) {
    throw new Error(response.error);
  }

  return response;
};

/**
 * JSON wrapper around the fetch API
 */
const api = {
  get: async (path: string, query: Record<string, any>) => {

    const qs = new URLSearchParams({
      ...query,
      api_key: apiToken,
    }).toString();

    const response = await fetch(
      `${baseURL}${path}${qs ? `?${qs}` : qs}`
    ).then(handleResponse);

    return response
  },

  post: (path: string, data: any) =>
    fetch(`${baseURL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    }).then(handleResponse),

  put: (path: string, data: any) =>
    fetch(`${baseURL}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    }).then(handleResponse),

  patch: (path: string, data: any) =>
    fetch(`${baseURL}${path}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (path: string) =>
    fetch(`${baseURL}${path}`, {
      method: 'DELETE',
    }).then(handleResponse)
};

export default api;