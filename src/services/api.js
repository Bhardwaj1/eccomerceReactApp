const BASE_API_URL = 'http://localhost:5000'; // Change this as needed

export const GetData = async (endpoint) => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
};

export const PostData = async (endpoint, payload) => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to create data');
  return response.json();
};

export const PutData = async (endpoint, payload) => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Failed to update data');
  return response.json();
};

export const DeleteData = async (endpoint) => {
  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete data');
  return true; // You can return the deleted ID from outside the call
};
