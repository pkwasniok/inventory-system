import { useSession } from 'next-auth/react';
import { Flex, Spinner, Text, Button, Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { api } from '../../utils/api';
import { useRouter } from 'next/navigation';



const Welcome = () => {
  const router = useRouter();
  const session = useSession({ required: true });
  const organizations = api.organization.getAll.useQuery();
  const { mutateAsync: createOrganization } = api.organization.create.useMutation({
    onSuccess: () => organizations.refetch(),
  });

  const handleOrganizationCreate = async () => {
    const organization = await createOrganization({ name: 'Organizacja'});
    router.push(`/app/${organization.id}`);
  }

  if (session.status == 'loading' || organizations.status == 'loading') {
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

  else if (organizations.data!.length == 1) {
    console.log(organizations.data![0]!);
    router.push(`/app/${organizations.data![0]!.id}`);
  }

  else if (organizations.data!.length > 1) {
    return (
      <Flex
        position="fixed"
        inset={0}
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap={5}
      >
        <Text>Nie jesteś nowym użytkownikiem</Text>
        <Text>Jeśli masz więcej niż jedną organizację to będzie można wybrać, tą do której chce się przejść</Text>
      </Flex>
    )
  }

  else {
    return (
      <Flex
        position="fixed"
        inset={0}
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap={5}
      >
        <Text>Jesteś nowym użytkownikiem</Text>
        <Text>Tutaj możesz utworzyć nową organizację, do której zostaniesz potem automatycznie przeniesiony</Text>

        <Button
          onClick={handleOrganizationCreate}
        >
          Utwórz organizację
        </Button>
      </Flex>
    );
  }
}



export default Welcome;
