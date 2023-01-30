import { AppLayout } from '@/components';

import { useRouter } from 'next/router';

import { api } from '@/utils/api';

import {
  Box,
  Center,
  Flex,
  Spinner,
  Card,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
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
      <Flex
        w="100%"
        h="100%"
        p={3}
        direction="row"
        gap={3}
      >
        <Flex
          maxW="400px"
          w="100%"
          h="100%"
        >
          <Tabs
            flex={1}
            variant="enclosed"
            borderColor="gray.600"
            overflow="hidden"
            flexDirection="column"
          >
            <TabList>
              <Tab>Wyszukiwanie</Tab>
              <Tab>Analityka</Tab>
            </TabList>

            <TabPanels h="100%">
              <TabPanel
                h="95%"
                boxSizing="border-box"
                border="1px"
                borderColor="gray.600"
                borderBottomRadius={6}
              >
                Panel 1
              </TabPanel>

              <TabPanel
                h="95%"
                boxSizing="border-box"
                border="1px"
                borderColor="gray.600"
                borderBottomRadius={6}
              >
                Panel 2
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>

        <Card
          variant="outline"
          flex={1}
          h="100%"
          p={3}
        >
        </Card>
      </Flex>
    </AppLayout>
  )
}



export default Inventory;
