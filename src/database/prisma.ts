import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
//se ela for em producaão nao precisa mostra o log e se nao for em producao e for um ambiente de desenvolvimento mostre a query
  log: process.env.NODE_ENV === "production" ? [] : ["query"],
})