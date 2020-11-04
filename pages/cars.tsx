/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Flex } from '@chakra-ui/core';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import useSWR from 'swr';

import CarPagination from '../components/CarPagination';
import Search from '../components/Search';
import { getMakes, Make } from '../lib/getMakes';
import { getPaginatedCars } from '../lib/getPaginatedCars';
import { Car } from '../types/car';

type CarListProps = {
  makes: Make[];
  cars: Car[];
  totalPages: number;
};

type NewCars = {
  data?: {
    cars: Car[];
    totalPages: number;
  };
};

export default function CarList({ makes, cars, totalPages }: CarListProps) {
  const { query } = useRouter();

  const { data: newCars }: NewCars = useSWR(`/api/cars?${stringify(query)}`, {
    dedupingInterval: 600_000,
    initialData: { totalPages, cars },
    revalidateOnMount: true,
  });

  return (
    <Flex direction={{ base: 'column', lg: 'row' }} width="100%">
      <Flex flex="1" minW="280px">
        <Search singleColumn makes={makes} />
      </Flex>

      <CarPagination totalPages={newCars?.totalPages} />
      <Flex flex="2" border="1px">
        <pre>{JSON.stringify(newCars, null, 4)}</pre>
      </Flex>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [paginatedCars, makes] = await Promise.all([
    getPaginatedCars(),
    getMakes(),
  ]);

  return {
    props: {
      cars: paginatedCars.cars,
      makes,
      totalPages: paginatedCars.totalPages,
    },
  };
};
