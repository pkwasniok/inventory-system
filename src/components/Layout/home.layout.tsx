import { type ReactNode } from 'react';
import { Box, Flex, Heading, Link, Button } from '@chakra-ui/react';
import NextLink from '../NextLink';



const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      position="fixed"
      inset={0}
      direction="column"
      alignItems="center"
    >
      <Flex
        position="fixed"
        top={0}
        left={0}
        h={14}
        px={3}
        w="100%"
        direction="row"
        alignItems="center"
        justifyContent="center"
        borderBottom="1px"
        borderBottomColor="gray.100"
        bg="white"
        backdropBlur="md"
      >
        <Flex
          h="100%"
          maxW="1200px"
          w="100%"
          direction="row"
          alignItems="center"
        >
          <Heading
            size="md"
            fontWeight="bold"
          >
            Inventory System
          </Heading>

          <Flex
            ml={10}
            direction="row"
            gap={5}
          >
            <Link
              href="/"
              as={NextLink}
            >
              Strona główna
            </Link>

            <Link
              href="/help"
              as={NextLink}
            >
              Pomoc
            </Link>

            <Link
              href="/contact"
              as={NextLink}
            >
              Kontakt
            </Link>
          </Flex>

          <Flex
            flex={1}
            direction="row"
            justifyContent="end"
            gap={5}
          >
            <Button
              colorScheme="blue"
              variant="ghost"
              size="sm"
              as={NextLink}
              href="/login"
            >
              Logowanie
            </Button>

            <Button
              colorScheme="blue"
              variant="solid"
              size="sm"
              as={NextLink}
              href="/register"
            >
              Rejestracja
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Box h={14}/>

      <Flex
        maxW="1200px"
        w="100%"
        h="100%"
        direction="column"
      >
        {children}
      </Flex>
    </Flex>
  );
}



export default HomeLayout;
