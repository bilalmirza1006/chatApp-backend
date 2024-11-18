// import { Express } from "express";
import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { errorMiddleware } from "./middleware/error";
import { SignUpSchema } from "./schema/users";
const cors = require('cors');

const app: Express = express();


const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,POST',            // Allowed HTTP methods
    allowedHeaders: 'Content-Type', // Allowed headers
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // Handle preflight requests


app.use(express.json());

app.use('/api', rootRouter)


export const prismaClient = new PrismaClient({
    log: ['query']
})

app.use(errorMiddleware)

app.listen(3001, () => {
    console.log('Server is running on port 3000', 3001);
});
