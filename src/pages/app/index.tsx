import { useSession } from 'next-auth/react';
import { Flex, Spinner, Text, Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { api } from '../../utils/api';



const Welcome = () => {
  const session = useSession({ required: true });
  const { mutate: createOrganization } = api.organization.create.useMutation({
    onSuccess: () => refetch(),
  });
  const { data: organizations, refetch } = api.organization.get.useQuery();

  useEffect(() => {
    console.log('Session', session);
  }, [session]);

  useEffect(() => {
    console.log('Organizations', organizations);
  }, [organizations]);

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
        onClick={() => createOrganization({ name: 'Test' })}
      >
        Create organization
      </Button>

      <Text>
        Found {organizations?.length ?? 0} organizations
      </Text>
    </Flex>
  );
}



export default Welcome;
