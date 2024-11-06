// import { Router } from "express";
// import { Login, signup } from "../controllers/auth";
// import { errorHandler } from "../error-handler";

// const authRoutes: Router = Router()

// authRoutes.post('/signup', errorHandler(signup))
// authRoutes.post('/login', errorHandler(Login))


// export default authRoutes;


import { Router } from "express";
import { Login, signup } from "../controllers/auth";
import { errorHandler } from "../error-handler";

const authRoutes: Router = Router();

// Apply errorHandler for each route to catch errors
authRoutes.post('/signup', errorHandler(signup));
authRoutes.post('/login', errorHandler(Login));

export default authRoutes;
