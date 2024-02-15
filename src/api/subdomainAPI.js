import axios from 'axios';

const BASE_URL = 'https://noisse-backend-development.up.railway.app';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

//export const testAuth = async () => {
//  try {
//    const response = await api.get('/test-auth');
//    return response.data;
//  } catch (error) {
//    console.error('Test Auth error:', error);
//    throw new Error('Auth test failed');
//  }
//};


export const getUserProfile = async () => {
  try {
    const response = await api.get('/portal/user');
    return response.data; // returns the user data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile');
  }
};


export const enumerateSubdomains = async (domain) => {
  try {
      const response = await api.post(`/domains/enumerate`, { domain });
      return response.data;
  } catch (error) {
      console.error('Error during subdomain enumeration:', error);
      throw new Error('There was an issue starting the domain enumeration.'); // User-friendly error
  }
};

export const getSubdomains = async (search, page, limit) => {
  try {
    const response = await api.get(`/subdomains`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching subdomains:', error);
    throw new Error('Could not retrieve subdomains. Please try again later.');
  }
};


export const getActiveDomains = async (search, page, limit) => {
  try {
    const response = await api.get(`/active-domains`, { params: { search: search || '', page, pageSize: limit} });
    return response.data;
  } catch (error) {
    console.error('Error fetching active domains:', error);
    throw new Error('Could not retrieve active domains.');
  }
};

export const getWebDomains = async (search, page, limit) => {
  try {
    const response = await api.get(`/web-domains`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching web domains:', error);
    throw new Error('Could not retrieve web domains.');
  }
};

export const getDiscoveredDomainsCount = async (interval) => {
  try {
    const response = await api.get(`/domains/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching discovered domains count:', error);
    return 0; // Return default value in case of error
  }
};

export const getActiveDomainsCount = async (interval) => {
  try {
    const response = await api.get(`/active-domains/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching active domains count:', error);
    return 0; // Return default value in case of error
  }
};

export const getWebDomainsCount = async (interval) => {
  try {
    const response = await api.get(`/web-domains/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching web domains count:', error);
    return 0; // Return default value in case of error
  }
};
 

export const getIPAssets = async (search, page, limit) => {
  try {
    const response = await api.get(`/assets-ips`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching assets ips:', error);
    throw new Error('Could not retrieve assets ips.');
  }
};

export const getIPAssetsCount = async (interval) => {
  try {
    const response = await api.get(`/assets-ips/count`, { params: { interval } });
    return response.data.count || 0; // Return default value if count is undefined
  } catch (error) {
    console.error('Error fetching web domains count:', error);
    return 0; // Return default value in case of error
  }
};

export const getScreenshots = async (search, page, limit) => {
  try {
    const response = await api.get(`/webview`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    throw new Error('Could not retrieve web domains.');
  }
};

export const getCrawl = async (search, page, limit) => {
  try {
    const response = await api.get(`/jsview`, { params: { search: search || '', page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    throw new Error('Could not retrieve web domains.');
  }
};

export const getUserWebhook = async (hunterId) => {
  try {
    const response = await api.get('/user/webhook', {
      params: { hunter_id: hunterId }
    });
    return response.data; // This should return an object with the webhookUrl
  } catch (error) {
    console.error('Error fetching user webhook:', error);
    throw new Error('Failed to fetch user webhook');
  }
};


export const updateUserWebhook = async (webhookUrl) => {
  try {
    const response = await api.post('/user/webhook', { webhookUrl });
    return response.data;
  } catch (error) {
    console.error('Error updating user webhook:', error);
    throw new Error('Failed to update user webhook');
  }
};
