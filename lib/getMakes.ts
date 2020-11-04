/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Make = {
  make: string;
  count: number;
};

export async function getMakes() {
  const makes = await prisma.$queryRaw(
    `SELECT make, count(*) as count 
    FROM car 
    GROUP BY make`
  );

  return makes;
}
