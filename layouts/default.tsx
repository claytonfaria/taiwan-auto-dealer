/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Flex, Box } from '@chakra-ui/core';
import { ReactNode } from 'react';

import Footer from '../components/footer';
import NavBar from '../components/Navbar';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" height="100vh">
      <NavBar />
      <Flex flex="1" width="1024px" marginX="auto">
        {children}
      </Flex>
      <Footer />
    </Flex>
  );
}
