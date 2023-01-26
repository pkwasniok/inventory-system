import { AppLayout } from '../../components';
import { useSession } from 'next-auth/react';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';



const Welcome = () => {
  const session = useSession({ required: true });

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <Flex
      position="fixed"
      w="100%"
      h="100%"
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
    >
      <Spinner
        color="blue.600"
        size="xl"
      />

      <Text color="blue.600">
        Ładowanie aplikacji
      </Text>
    </Flex>
  );
}



export default Welcome;
