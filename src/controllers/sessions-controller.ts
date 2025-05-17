import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/config/auth";

class SessionsController {
  async create( request: Request, response: Response ){
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })
    
    const { email, password } = bodySchema.parse(request.body)

    //recuperando o usuario
    const user = await prisma.user.findFirst({
      where: { email },

    })

    //caso nap tenha um usuario encontrado
    if (!user) {
      throw new AppError("invalid email or password", 401)
      
    }
    

    // comparação da senha informada, user.password seria a seha q o usuario esta tentando logar q ja esta dentro do banco
    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError("invalid email or password", 401)

    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({ role: user.role ?? "customer"}, secret, {
      subject: user.id,
       expiresIn,
       })

       //retorna os dados do usuario
       const {password: hashedPassword, ...userWithoutPassword} = user

    return response.json({ token,/* ... userWithoutPasswor uma possibilidade agr a outra */ user : userWithoutPassword })
  }
}

export {SessionsController}