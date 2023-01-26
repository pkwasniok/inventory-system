import { AppLayout } from '../../components';
import { useSession } from 'next-auth/react';
import { Flex, Spinner, Text, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { api } from '../../utils/api';



const Welcome = () => {
  const session = useSession({ required: true });
  const { mutate: createOrganization } = api.organization.create.useMutation();

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

      <Button
        onClick={() => createOrganization()}
      >
        Call API
      </Button>
    </Flex>
  );
}



export default Welcome;
