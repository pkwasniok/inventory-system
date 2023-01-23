import { Box, Center, Flex, Heading, Spacer, Link, Button, IconButton } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiOutlineBars3 } from 'react-icons/hi2';


const links: { label: string, href: string }[] = [
  {
    label: 'Strona główna',
    href: '/',
  }
]


const HomeLayout = () => {
  return (
    <Box
      position="fixed"
      inset={0}
    >
      <Center
        position="fixed"
        top={0}
        left={0}
        right={0}
        h={[16, 16, 14]}
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <Flex
          maxW="1200px"
          w="100%"
          h="100%"
          alignItems="center"
          px={[6, 6, 6, 6, 0]}
        >
          <Heading
            size="md"
          >
            Inventory System
          </Heading>

          <Box w={10}/>

          <Flex
            gap={6}
            display={['none', 'none', 'flex']}
          >
            <Link
              as={NextLink}
              href="#"
            >
              Strona główna
            </Link>

            <Link
              as={NextLink}
              href="#"
            >
              Pomoc
            </Link>

            <Link
              as={NextLink}
              href="#"
            >
              Kontakt
            </Link>
          </Flex>

          <Spacer/>

          <Flex
            gap={3}
            display={['none', 'none', 'flex']}
          >
            <Button
              as={NextLink}
              href="#"
              size="sm"
              variant="ghost"
            >
              Logowanie
            </Button>

            <Button
              as={NextLink}
              href="#"
              size="sm"
            >
              Rejestracja
            </Button>
          </Flex>

          <IconButton
            aria-label="Expand menu"
            icon={<HiOutlineBars3 size={24}/>}
          />
        </Flex>
      </Center>
    </Box>
  );
}



export default HomeLayout;
