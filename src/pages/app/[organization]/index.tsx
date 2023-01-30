import { useRouter } from 'next/router';
import { AppLayout } from '@/components';
import { api } from '@/utils/api';

import {
  Flex,
  Card,
} from '@chakra-ui/react';



const Organization = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const organization = api.organization.getById.useQuery(query.organization);

  return (
    <AppLayout
      organization={organization.data ?? undefined}
      loading={organization.status == 'loading'}
    >
      <Flex
        w="100%"
        h="100%"
        direction="row"
        p={3}
        gap={3}
      >
        <Flex
          maxW="350px"
          w="100%"
          direction="column"
        >
          <Sidebar />
        </Flex>

        <Flex
          flex={1}
          direction="column"
          gap={3}
        >
          <ItemsTable/>
        </Flex>
      </Flex>
    </AppLayout>
  );
}



const Sidebar = () => {
  return (
    <Card
      w="100%"
      h="100%"
      variant="outline"
    >

    </Card>
  );
}



const ItemsTable = () => {
  return (
    <>
    </>
  )
}



export default Organization;
