import { type ReactNode } from 'react';
import { Box, Flex, Heading, Link, Button } from '@chakra-ui/react';



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
        h={16}
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
            <Link href="/">Strona główna</Link>
            <Link href="/help">Pomoc</Link>
            <Link href="/contact">Kontakt</Link>
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
              as="a"
              href="/login"
            >
              Logowanie
            </Button>

            <Button
              colorScheme="blue"
              variant="solid"
              size="sm"
              as="a"
              href="/register"
            >
              Rejestracja
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Box h={16}/>

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
