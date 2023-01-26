import { AppLayout } from '../../../components';
import { useRouter } from 'next/router';
import { api } from '../../../utils/api';
import { Center, Spinner } from '@chakra-ui/react';



const App = () => {
  const router = useRouter();
  const query = router.query as { organization: string };
  const organization = api.organization.getById.useQuery(query.organization);

  if (organization.status == 'loading') {
    return (
      <Center
        position="fixed"
        inset={0}
      >
        <Spinner
          size="xl"
          color="blue.600"
        />
      </Center>
    )
  }

  else if (organization.data == null) {
    router.push('/app');
  }

  else {
    return (
      <AppLayout>
        {organization.data.name}
      </AppLayout>
    );
  }
}



export default App;
