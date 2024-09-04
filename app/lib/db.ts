import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();



// npx prisma migrate dev --name init or npx prisma migrate dev 
// npm install @prisma/client
// npx prisma generate