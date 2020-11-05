/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Box, Button, Heading, Text } from '@chakra-ui/core';
import { PrismaClient } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';

import { Car } from '../../../../types/car';

type CarDetailsProps = {
  car: Car;
};
const prisma = new PrismaClient();
export default function CarDetails({ car }: CarDetailsProps) {
  const { make, model, photourl, price, details, id } = car;

  return (
    <Box margin="0.5rem" boxShadow="dark-lg" borderRadius="5px">
      <Heading size="sm" paddingTop="10px" paddingX="10px">
        {make} {model}
      </Heading>
      <Heading size="xs" paddingX="10px" paddingBottom="5px">
        $ {price}
      </Heading>
      <Image src={photourl} height={300} width={450} />
      <Text paddingX="15px" paddingY="10px" fontSize="0.875rem">
        {' '}
        {details}
      </Text>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await prisma.car.findMany();
  const paths = response.map((car) => ({
    params: {
      id: car.id.toString(),
      make: car.make.replace(/\s/g, ''),
      model: car.model.replace(/\s/g, ''),
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
