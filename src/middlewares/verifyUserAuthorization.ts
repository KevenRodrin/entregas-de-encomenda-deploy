import { Request, Response, NextFunction } from "express";
import { AppError} from "@/utils/AppError";

//array de string para permiti varios perfil e nao restringir apenas um, para verificar se tem acesso ou n
function verifyUserAuthorization(role: string[]) {
  return(request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unauthorization", 401)
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorizatiooon", 401)
 
    }
    return next()
  }


}
 
export { verifyUserAuthorization }