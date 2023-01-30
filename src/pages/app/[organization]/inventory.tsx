import { AppLayout } from '@/components';

import { useRouter } from 'next/router';

import { api } from '@/utils/api';

import {
  Center,
  Spinner,
} from '@chakra-ui/react';



const Inventory = () => {
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

  return (
    <AppLayout
      organization={organization.data ?? undefined}
      title="Inwentaryzacja"
    >
      Inventory
    </AppLayout>
  )
}



export default Inventory;
