/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */

import { Flex } from '@chakra-ui/core';
import { GetStaticProps } from 'next';

import Search from '../components/Search';
import { getMakes, Make } from '../lib/getMakes';

type HomeProps = {
  makes: Make[];
};

export default function Home({ makes }: HomeProps) {
  return (
    <Flex justifyContent="center">
      <Search makes={makes} />
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const makes = await getMakes();

  return {
    props: { makes },
  };
};
