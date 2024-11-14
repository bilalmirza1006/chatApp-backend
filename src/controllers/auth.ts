import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashSync, compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../secrets"; 
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    SignUpSchema.parse(req.body)
    const { email, password, firstName, lastName } = req.body
    let user = await prisma.user.findFirst({ where: { email: email } })
    if (user) {
        return next(new BadRequestException('User already exists', ErrorCode.USER_ALREADY_EXISTS));
    }
    user = await prisma.user.create({
        data: {
            email,
            firstName,
            lastName,
            password: hashSync(password, 10),
        }
    })
    res.json(user)
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    let user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
        return next(new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND));
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
        return next(new BadRequestException('Incorrect password', ErrorCode.INCORRECT_PASSWORD));
    }
    const token = jwt.sign({
        userId: user.id,
    }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ user, token });
};
