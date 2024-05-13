// Configuration file for environment variables

// Development environment configuration
export const environment = {
  production: false, // Indicates whether the application is in production mode

  // API URLs for different services
  apiUrl: 'http://localhost:3000/api',

  // URL for product
  productUrl: 'http://localhost:3000/api/product',

  // URL for account authentication
  authUrl: 'http://localhost:3000/api/auth',

  //URL for review
  reviewUrl: 'http://localhost:3000/api/review',

  // URL to handle analytics
  analyticsUrl: 'http://localhost:3000/api/analytics',

  // URL for handling product images
  productImgUrl: 'http://localhost:3000/productimg',

  // URL for merchant PDFs
  merchantPdfUrl: 'http://localhost:3000/merchantup',

  // PayPal client ID for payment integration
  paypal_client_id: 'ARhWv4SwDLHJ4w4_HKO4vlCgd3FqCCZePNIgTJ2ytSpvB78CXZ_7jphQAjJ4MWiCArJQJxpuV_v6CU-B',

  // URL for handling orders
  orderUrl: 'http://localhost:3000/api/order',

  // Exchange rate API for currency conversion
  currencyExchangeAPI: 'https://api.exchangerate-api.com/v4/latest/MYR',
};
