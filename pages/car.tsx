/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Flex, Grid, Box } from '@chakra-ui/core';
import { GetStaticProps } from 'next';
import { useEffect } from 'react';

import Search from '../components/search';
import { getMakes, Make } from '../lib/getMakes';
import { Model } from '../lib/getModels';
import { getPaginatedCars } from '../lib/getPaginatedCars';
import { Car } from '../types/car';
import axios from 'axios';

import { useRouter } from 'next/router';
import useSWR from 'swr';

type CarListProps = {
  makes: Make[];
  cars: Car[];
  // models: Model[];
  totalPages: number;
};

export default function CarList({ makes, cars, totalPages }: CarListProps) {
  // const fetcher = (url: string) => axios(url).then((r) => r.data);
  // const router = useRouter();

  // const { data: models } = useSWR<Model[]>(
  //   `/api/models?make=${router.query.make}`,
  //   fetcher
  // );

  // console.log(models);

  // FAZER SWR com pathname, fazer api end point ************************************

  return (
    <Flex direction={{ base: 'column', lg: 'row' }} width="100%">
      <Flex flex="1" minW="280px">
        <Search singleColumn makes={makes} />
      </Flex>
      <Flex flex="2" border="1px">
        <pre>{JSON.stringify({ totalPages, cars }, null, 4)}</pre>
      </Flex>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const makes = await getMakes();
  const pagination = await getPaginatedCars();
  return {
    props: { makes, cars: pagination.cars, totalPages: pagination.totalPages },
  };
};
