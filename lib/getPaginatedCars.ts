/* eslint-disable sonarjs/prefer-immediate-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { PrismaClient } from '@prisma/client';
import { ParsedUrlQuery } from 'querystring';

import { Car } from '../types/car';
import { getReqAsString } from '../utils/getReqAsString';

const prisma = new PrismaClient();

export async function getPaginatedCars(query?: ParsedUrlQuery) {
  const page = getValueNumber(query?.page) || 1;
  const rowsPerPage = getValueNumber(query?.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const { make, model, minPrice, maxPrice } = {
    make: getValueStr(query?.make),
    model: getValueStr(query?.model),
    minPrice: getValueNumber(query?.minPrice),
    maxPrice: getValueNumber(query?.minPrice),
  };

  const cars: Car[] = await prisma.car.findMany({
    take: rowsPerPage,
    skip: offset,
    where: {
      make: undefined || make,
      model: undefined || model,
      price: undefined || {
        gte: minPrice,
        lte: maxPrice,
      },
    },
  });

  const totalRows = await prisma.car.count({
    where: {
      make: undefined || make,
      model: undefined || model,
      price: undefined || {
        gte: minPrice,
        lte: maxPrice,
      },
    },
  });

  return { cars, totalPages: Math.ceil(totalRows / rowsPerPage) };
}

function getValueNumber(value?: string | string[]): number | undefined {
  const str = getValueStr(value);
  if (str === undefined) {
    return;
  }
  const number = Number.parseInt(str);
  return Number.isNaN(number) ? undefined : number;
}

function getValueStr(value?: string | string[]) {
  const str = getReqAsString(value);
  return !str || str.toLowerCase() === 'all' ? undefined : str;
}
