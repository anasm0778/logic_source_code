// Environment-based API configuration
const getServerUrl = () => {
  // Check if we're in development mode
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on localhost (any port)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:4000';
    }
  }
  
  // Check environment variable (if available)
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Default to production for server-side rendering
  return 'https://logicrent.ae/api';
};

export const serverUrl = getServerUrl();

// For easy switching during development, you can manually override:
// export const serverUrl = "http://localhost:4000";  // Local development
// export const serverUrl = "https://logicrent.ae/api"; // Production