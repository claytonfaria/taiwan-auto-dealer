/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Flex, Text, Box, SimpleGrid, Heading, Spinner } from '@chakra-ui/core';
import deepEqual from 'fast-deep-equal';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import { useState } from 'react';
import useSWR from 'swr';

import { CarCard, CarPagination, Search } from '../components';
import { getPaginatedCars } from '../lib/getPaginatedCars';
import { Car } from '../types/car';

type HomeProps = {
  cars: Car[];
  totalPages: number;
};

type NewCars = {
  data?: {
    cars: Car[];
    totalPages: number;
  };
};

export default function Home({ cars, totalPages }: HomeProps) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const { data: newCars }: NewCars = useSWR(`/api/cars?${stringify(query)}`, {
    dedupingInterval: 600_000,
    initialData: deepEqual(query, serverQuery)
      ? { cars, totalPages }
      : undefined,
  });

  if (!newCars) {
    return <Spinner />;
  }

  return (
    <>
      <CarPagination totalPages={newCars?.totalPages} />
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        {newCars?.cars.map((car) => (
          <CarCard data={car} key={car.id} />
        ))}
      </SimpleGrid>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const paginatedCars = await getPaginatedCars();

  return {
    props: {
      cars: paginatedCars.cars,
      totalPages: paginatedCars.totalPages,
    },
  };
};
