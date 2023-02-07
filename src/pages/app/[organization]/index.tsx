import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/utils/api';

import {
  Center,
  Spinner,
} from '@chakra-ui/react';



const Organization = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const organization = api.organization.getById.useQuery(query.organization);

  useEffect(() => {
    if (organization.data == undefined) {
      router.push('/app');
    } else {
      router.push(`/app/${organization.data!.id}/inventory`);
    }
  }, [organization, router]);

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
  );
}



export default Organization;
