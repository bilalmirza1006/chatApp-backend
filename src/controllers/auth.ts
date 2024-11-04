import { Request, Response } from "express"
import { prismaClient } from ".."
import { hashSync } from 'bcrypt'
import { UserSignupData } from "../types/UserTypes"

export const signup = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body
    let user = await prismaClient.user.findFirst({ where: { email: email } })
    if (user) {
        throw Error('User already exists')
    }

    user = await prismaClient.user.create({
        data: {
            email,
            firstName,
            lastName,
            password: hashSync(password, 10)
        }
    })
    res.json(user)
}