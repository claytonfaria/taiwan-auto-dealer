/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Model = {
  model: string;
  count: number;
};

export async function getModels(make?: string) {
  const models: Model[] = await prisma.$queryRaw(
    `SELECT model, count(*) as count 
    FROM car 
    WHERE make = $1
    GROUP BY model`,
    make
  );

  return models;
}
