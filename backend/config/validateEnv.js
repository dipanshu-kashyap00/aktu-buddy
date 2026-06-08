// // backend/config/validateEnv.js
// const requiredEnvVars = [
//   'MONGODB_URI',
//   'JWT_SECRET',
//   'CLOUDINARY_CLOUD_NAME',
//   'CLOUDINARY_API_KEY',
//   'CLOUDINARY_API_SECRET'
// ];

// const validateEnv = () => {
//   const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
//   if (missing.length > 0) {
//     throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
//   }
// };

// export default validateEnv;

// // backend/server.js - Call at startup
// import validateEnv from './config/validateEnv.js';
// validateEnv();