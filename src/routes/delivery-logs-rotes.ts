import { Router } from "express";

import { DeliveriesLogsController } from "@/controllers/delivery-logs-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveriesLogsController()

deliveryLogsRoutes.post(
  //pra criar é somente o vendendor tem acesso mais para exibir as informações de um pedido o cliente tenha o acesso
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
   deliveryLogsController.create
  )

  deliveryLogsRoutes.get(
    "/:delivery_id/show", 
    ensureAuthenticated,
    verifyUserAuthorization(["sale", "customer"]),
    deliveryLogsController.show
)

  export { deliveryLogsRoutes }