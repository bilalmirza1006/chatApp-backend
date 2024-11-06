import { z } from 'zod';

export const SignUpSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }), // Minimum length of 1 to ensure it's not empty
    lastName: z.string().min(1, { message: "Last name is required" }),   // Minimum length of 1 to ensure it's not empty
    email: z.string().email({ message: "Invalid email address" }),       // Validate as email
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }), // Minimum length of 8 for password
});
