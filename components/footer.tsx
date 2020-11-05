/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Text, Flex } from '@chakra-ui/core';

export default function Footer() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      marginY="1rem"
      paddingY="1rem"
    >
      <Text fontSize={{ base: 'xs', lg: 'sm' }}>
        Copyright &copy; {new Date().getFullYear()} Taiwan Auto. All Rights
        Reserved.
      </Text>
    </Flex>
  );
}
