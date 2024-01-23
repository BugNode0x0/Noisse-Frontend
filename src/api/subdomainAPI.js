import axios from 'axios';

const BASE_URL = 'https://prototype-apidev.noisse.io';

// src/api/subdomainAPI.js
export const enumerateSubdomains = async (domain) => {
  try {
      const response = await axios.post(`${BASE_URL}/domains/enumerate`, { domain });
      return response.data;
  } catch (error) {
      console.error('Error during subdomain enumeration:', error);
      throw new Error('There was an issue starting the domain enumeration.'); // User-friendly error
  }
};

export const getSubdomains = async (search, page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/subdomains`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching subdomains:', error);
    throw new Error('Could not retrieve subdomains. Please try again later.');
  }
};


export const getActiveDomains = async (search, page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/active-domains`, { params: { search: search || '', page, pageSize: limit} });
    return response.data;
  } catch (error) {
    console.error('Error fetching active domains:', error);
    throw new Error('Could not retrieve active domains.');
  }
};

export const getWebDomains = async (search, page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/web-domains`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching web domains:', error);
    throw new Error('Could not retrieve web domains.');
  }
};

export const getDiscoveredDomainsCount = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/domains/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching discovered domains count:', error);
    return 0; // Return default value in case of error
  }
};

export const getActiveDomainsCount = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/active-domains/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching active domains count:', error);
    return 0; // Return default value in case of error
  }
};

export const getWebDomainsCount = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/web-domains/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching web domains count:', error);
    return 0; // Return default value in case of error
  }
};
 
// Charts API
export const getDiscoveredDomainsChartData = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/domains/chart-data`, { params: { interval } });
    return response.data; // Assuming the backend returns an array of data points
  } catch (error) {
    console.error('Error fetching discovered domains chart data:', error);
    return []; // Return an empty array in case of error
  }
};

export const getActiveDomainsChartData = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/active-domains/chart-data`, { params: { interval } });
    return response.data; // Assuming the backend returns an array of data points
  } catch (error) {
    console.error('Error fetching active domains chart data:', error);
    return []; // Return an empty array in case of error
  }
};

export const getWebDomainsChartData = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/web-domains/chart-data`, { params: { interval } });
    return response.data; // Assuming the backend returns an array of data points
  } catch (error) {
    console.error('Error fetching web domains chart data:', error);
    return []; // Return an empty array in case of error
  }
};

export const getIPAssets = async (search, page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/assets-ips`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching web domains:', error);
    throw new Error('Could not retrieve web domains.');
  }
};

export const getIPAssetsCount = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/assets-ips/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching web domains count:', error);
    return 0; // Return default value in case of error
  }
};

// Add the following function to subdomainAPI.js
export const getIPAssetsChartData = async (interval) => {
  try {
    const response = await axios.get(`${BASE_URL}/assets-ips/chart-data`, { params: { interval } });
    return response.data; // Assuming the backend returns an array of chart data points
  } catch (error) {
    console.error('Error fetching IP assets chart data:', error);
    return []; // Return an empty array in case of error
  }
};

export const getThreats = async (search, page, limit) => {
  try {
    const response = await axios.get(`${BASE_URL}/flaws`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching web domains:', error);
    throw new Error('Could not retrieve web domains.');
  }
};