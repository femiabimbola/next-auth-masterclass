// To prevent too many prisma client, we have to add store the database in  globalThis.prisma for the development mode only
// globalThis is not affected by hotreload

// Prisma Learning, do this before doing Prisma init, after add this, do Prisma init

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Nextjs hotreload will use the globalThis.prisma

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db


// export const db = new PrismaClient(); it is for production