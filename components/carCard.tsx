/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Text, Box, Heading, Link } from '@chakra-ui/core';
import Image from 'next/image';
import NextLink from 'next/link';

import { Car } from '../types/car';

type CarCardProps = {
  data: Car;
};

export default function CarCard({ data }: CarCardProps) {
  const { make, model, photourl, price, details, id } = data;

  return (
    <NextLink href={`/car/${make}/${model.replaceAll(' ', '')}/${id}`}>
      <Link _hover={{ textDecoration: 'none' }}>
        <Box margin="0.5rem" boxShadow="dark-lg" borderRadius="5px">
          <Heading size="sm" paddingTop="10px" paddingX="10px">
            {make} {model}
          </Heading>
          <Heading size="xs" paddingX="10px" paddingBottom="5px">
            $ {price}
          </Heading>
          <Image src={photourl} height={300} width={450} alt={model} />
          <Text paddingX="15px" paddingY="10px" fontSize="0.875rem">
            {' '}
            {details}
          </Text>
        </Box>
      </Link>
    </NextLink>
  );
}
