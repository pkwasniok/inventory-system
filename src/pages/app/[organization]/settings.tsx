import { useRouter } from 'next/router';
import { AppLayout } from '@/components';
import { api } from '@/utils/api';

import {
  Center,
} from '@chakra-ui/react';



const OrganizationSettings = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const organization = api.organization.getById.useQuery(query.organization);

  return (
    <AppLayout
      title="Ustawienia"
      organization={organization.data ?? undefined}
      loading={organization.status == 'loading'}
    >
      <Center
        h="100%"
      >
      </Center>
    </AppLayout>
  );
}



export default OrganizationSettings;
