import { Text, Flex } from '@chakra-ui/core';

export default function Footer() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      marginTop="1rem"
      paddingTop="1rem"
      // marginBottom={{ base: '3rem', lg: '1rem' }}
      // paddingBottom={{ base: '6rem', lg: '1rem' }}
    >
      <Text fontSize={{ base: 'xs', lg: 'sm' }}>
        Copyright &copy; {new Date().getFullYear()} Clayton Faria. All Rights
        Reserved.
      </Text>
    </Flex>
  );
}
