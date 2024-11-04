import dotenv from 'dotenv';

dotenv.config(); // This will look for .env in the root directory
console.log("env", process.env.PORT);

export const PORT = process.env.PORT;
