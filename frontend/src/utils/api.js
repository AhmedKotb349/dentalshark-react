/**
 * API Integration Utility
 * Requirement: "api integration(2 methods: get & post)"
 * Requirement: "Write clean, readable, and maintainable code"
 */

const BASE_URL = 'http://localhost:5000/api';

/**
 * GET Method
 * Fetches data from the specified endpoint
 * @param {string} endpoint - API endpoint (e.g., '/products')
 */
export const get = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });
    if (!response.ok) throw new Error(`GET request failed: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
};

/**
 * POST Method
 * Sends data to the specified endpoint
 * @param {string} endpoint - API endpoint (e.g., '/analyze')
 * @param {Object} data - Data to be sent in the request body
 */
export const post = async (endpoint, data) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`POST request failed: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error('API POST Error:', error);
    throw error;
  }
};
