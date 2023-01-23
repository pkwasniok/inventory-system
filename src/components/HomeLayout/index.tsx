import { type ReactNode } from 'react';
import NextLink from 'next/link';
import { Box, Center, Flex, Heading, Spacer, Link, Button, IconButton, useBoolean } from '@chakra-ui/react';
import { HiOutlineBars3 } from 'react-icons/hi2';



const LOGIN_URL = '/login';
const REGISTER_URL = '/register';
const ENABLE_AUTH_ON_MOBILE = true;
const NAVIGATION_URL: { label: string, href: string }[] = [
  {
    label: 'Strona główna',
    href: '/',
  },
  {
    label: 'Pomoc',
    href: '/',
  },
  {
    label: 'Kontakt',
    href: '/',
  },
];



interface HomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [mobileMenu, setMobileMenu] = useBoolean(false);

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
            display={['none', 'none', 'flex']}
            gap={6}
          >
            {NAVIGATION_URL.map(({ label, href }: { label: string, href: string }, index: number) => (
              <Link
                key={index}
                as={NextLink}
                href={href}
              >
                {label}
              </Link>
            ))}
          </Flex>

          <Spacer/>

          <Flex
            display={['none', 'none', 'flex']}
            gap={3}
          >
            <Button
              as={NextLink}
              href={LOGIN_URL}
              size="sm"
              variant="ghost"
            >
              Logowanie
            </Button>

            <Button
              as={NextLink}
              href={REGISTER_URL}
              size="sm"
            >
              Rejestracja
            </Button>
          </Flex>

          <IconButton
            display={['flex', 'flex', 'none']}
            aria-label="Expand menu"
            icon={<HiOutlineBars3 size={24}/>}
            onClick={setMobileMenu.toggle}
          />

          <Flex
            display={['flex', 'flex', 'none']}
            position="fixed"
            zIndex={10}
            top={16}
            bottom={0}
            left={0}
            right={0}
            transform="auto"
            translateX={mobileMenu ? '0' : '-100vw'}
            translateY="-2px"
            transition="all"
            transitionDuration="0.1s"
            bg="white"
            direction="column"
            gap={3}
            p={3}
          >
            {NAVIGATION_URL.map(({ label, href }: { label: string, href: string }, index: number) => (
              <Button
                key={index}
                as={NextLink}
                href={href}
                variant="ghost"
                justifyContent="start"
              >
                {label}
              </Button>
            ))}

            <Spacer/>

            {ENABLE_AUTH_ON_MOBILE &&
              <Flex
                w="100%"
                gap={3}
              >
                <Button
                  as={NextLink}
                  href={LOGIN_URL}
                  flex={1}
                >
                  Logowanie
                </Button>

                <Button
                  as={NextLink}
                  href={REGISTER_URL}
                  flex={1}
                  colorScheme="blue"
                >
                  Rejestracja
                </Button>
              </Flex>
            }
          </Flex>
        </Flex>
      </Center>

      <Box h={[16, 16, 14]}/>

      <Center
        w="100%"
        h="100%"
      >
        <Box
          maxW="1200px"
          w="100%"
          h="100%"
        >
          {children}
        </Box>
      </Center>
    </Box>
  );
}



export default HomeLayout;
