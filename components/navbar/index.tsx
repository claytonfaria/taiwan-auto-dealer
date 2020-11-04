/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Box, Flex, Heading, List, ListItem, Link } from '@chakra-ui/core';
import NextLink from 'next/link';

export default function NavBar() {
  return (
    <Box minWidth="100%" background="blue.400" padding="1rem" color="white">
      <Flex justifyContent="space-between">
        <Heading size="lg">Taiwan Auto</Heading>
        <List display="flex" alignItems="center">
          <ListItem paddingX="1rem">
            <NextLink href="/">
              <Link>Home</Link>
            </NextLink>
          </ListItem>
          <ListItem paddingX="1rem">
            <NextLink href="/faq">
              <Link>FAQ</Link>
            </NextLink>
          </ListItem>
        </List>
      </Flex>
    </Box>
  );
}
