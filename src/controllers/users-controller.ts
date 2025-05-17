import { Request, Response} from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

import { hash } from "bcrypt";
import { never, z } from "zod";

class UsersController {
   async create( request: Request, response: Response){
    const bodySchema = z.object({
      name: z.string().trim().min(1),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const {name, email, password} = bodySchema.parse(request.body)

    // verificando se ja tem um email cadastrado
    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })   
     
    if (userWithSameEmail) {
      throw new AppError("User um usuario com esse email ja existe")
    }
    
    //criptografia da senha
    const hashedPassword = await hash(password, 8)


    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
  },
     })

     //nao retornando a senha q esta aparecendo no insomina
     const { password:_, ...userWithoutPassword } = user


    return response.status(201).json( userWithoutPassword)
  }
}

export { UsersController }