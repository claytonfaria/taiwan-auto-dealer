/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { Car } from '../../../../types/car';

type CarDetailsProps = {
  car: Car;
};
const prisma = new PrismaClient();
export default function CarDetails({ car }: CarDetailsProps) {
  return (
    <>
      <Image src={car.photourl} width={450} height={300} />
      <h1>{car.make}</h1>
      <h1>{car.model}</h1>
      <h1>{car.price}</h1>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await prisma.car.findMany();
  const paths = response.map((car) => ({
    params: {
      id: car.id.toString(),
      make: car.make.replaceAll(' ', '').toLowerCase(),
      model: car.model.replaceAll(' ', '').toLowerCase(),
    },
  }));

  return { fallback: false, paths };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const car = await prisma.car.findOne({
    where: { id: Number(params?.id) },
  });

  return {
    props: { car },
    revalidate: 1000,
  };
};
