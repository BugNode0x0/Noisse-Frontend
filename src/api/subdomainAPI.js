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
    const response = await api.get(`/jsview`, { params: { search, page, pageSize: limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching crawl data:', error);
    throw new Error('Could not retrieve crawl data.');
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

export const cancelUserSubscription = async (webhookUrl) => {
  try {
    const response = await api.post('/cancel-subscription', { webhookUrl });
    return response.data;
  } catch (error) {
    console.error('Error updating user webhook:', error);
    throw new Error('Failed to update user webhook');
  }
};

export const createUserSubscription = async (data) => {
  try {
    const response = await api.post('/finalize-subscription', data);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to create subscription');
  }
};

export const createStripeCheckoutSession = async () => {
  try {
    const response = await api.post('/create-checkout-session');
    return response.data; 
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    throw new Error('Failed to create Stripe checkout session');
  }
};

export const fetchSubscriptionStatus = async () => {
  try {
    const response = await api.get('/subscription-status');
    return response.data; 
  } catch (error) {
    console.error('Error fetching subscription status:', error);
    throw error;  
  }
};

export const downloadAllDomainsCSV = async (search = '') => {
  try {
    const response = await api.get('/subdomains', {
      params: { format: 'csv', search },
      responseType: 'blob'  // Important for handling binary data like CSV
    });

    // Extract filename from Content-Disposition header
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'subdomains.csv';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
      if (filenameMatch.length === 2) {
        filename = filenameMatch[1];
      }
    }

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);  // Set the download attribute to the filename
    document.body.appendChild(link);
    link.click();

    // Clean up and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading CSV:', error);
    // Handle the error (e.g., show a notification to the user)
  }
};

export const downloadActiveDomainsCSV = async () => {
  try {
    const response = await api.get('/active-domains', {
      params: { format: 'csv' },
      responseType: 'blob' // Important for handling the binary data of the CSV file
    });

    // Create a Blob from the PDF Stream
    const file = new Blob(
      [response.data], 
      { type: 'text/csv;charset=utf-8;' }
    );

    // Build a URL from the file
    const fileURL = URL.createObjectURL(file);

    // Create a temporary anchor element and trigger a download
    const link = document.createElement('a');
    link.href = fileURL;
    link.setAttribute('download', 'active-domains.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error('Error downloading active domains CSV:', error);
    throw new Error('Failed to download active domains CSV.');
  }
};

export const downloadWebDomainsCSV = async (search) => {
  try {
    // Construct the URL with the 'format' query parameter set to 'csv'
    const response = await api.get(`/web-domains`, { 
      params: { search: search || '', format: 'csv' },
      responseType: 'blob' // Important for handling binary data like CSV
    });

    // Create a Blob from the CSV data
    const blob = new Blob([response.data], { type: 'text/csv' });

    // Create a link element and trigger the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'web-domains.csv'); // Set the file name for the download
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error('Error downloading web domains CSV:', error);
    throw new Error('Failed to download web domains CSV.');
  }
};

export const downloadAssetsCSV = async (search = '') => {
  try {
    const response = await api.get('/assets-ips', {
      params: { format: 'csv', search },
      responseType: 'blob' // Important for handling binary data like CSV
    });

    // Extract filename from Content-Disposition header or default to assets-ips.csv
    const filename = response.headers['content-disposition']
                     ? response.headers['content-disposition'].split('filename=')[1]
                     : 'assets-ips.csv';

    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // Set the download attribute to the filename
    document.body.appendChild(link);
    link.click();

    // Clean up and revoke the object URL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading assets CSV:', error);
    // Handle the error (e.g., show a notification to the user)
    throw new Error('Failed to download assets CSV.');
  }
};