import { AppLayout } from "../../components";
import { Flex, Heading, Text, Box, Button, Center } from '@chakra-ui/react';
import { type SessionContextValue, useSession } from 'next-auth/react';
import { HiOutlineChevronRight } from "react-icons/hi2";
import { useRouter } from 'next/router';
import NextLink from 'next/link';



const Wizard = () => {
  const router = useRouter();
  const query = router.query as { step: number|undefined };
  const session = useSession();

  return (
    <AppLayout title="Konfiguracja aplikacji">
      <Center h="100%">
        <Flex
          maxW="1200px"
          w="100%"
          h="100%"
          p={3}
        >
          {query.step == undefined &&
            <Step0
              session={session}
            />
          }
        </Flex>
      </Center>
    </AppLayout>
  )
}



const Step0 = ({ session }: { session: SessionContextValue}) => {
  return (
    <Flex
      h="100%"
      direction="column"
      alignItems="center"
      gap={4}
    >
      <Heading size="lg">Cześć Patryk!</Heading>
    </Flex>
  )
}



const Step1 = () => {
  return (
    <Flex>

    </Flex>
  )
}



export default Wizard;
