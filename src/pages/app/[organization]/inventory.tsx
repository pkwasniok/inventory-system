import { useState } from 'react';

import { useRouter } from 'next/router';

import { AppLayout } from '@/components';

import { api } from '@/utils/api';

import {
  useColorModeValue,
  Center,
  Flex,
  Spinner,
  Card,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Box,
  Input,
} from '@chakra-ui/react';

import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';

import { SearchBar } from '@/features/inventory';



const Inventory = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const [ searchPhrase, setSearchPhrase ] = useState('');

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
              <Tab>Filtry</Tab>
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
                <Flex
                  h="100%"
                  direction="column"
                  gap={3}
                >
                  <Heading size="sm">Księgi</Heading>

                  <Divider/>

                  <Flex
                    direction="row"
                    gap={3}
                    flexWrap="wrap"
                  >
                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="blue.800"
                      opacity={0.7}
                    >
                      Środki trwałe
                    </Box>

                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="blue.800"
                      opacity={0.7}
                    >
                      Środki nietrwałe
                    </Box>
                  </Flex>

                  <Heading size="sm" mt={10}>Pomieszczenia</Heading>

                  <Divider/>

                  <Input
                    size="sm"
                    variant="filled"
                  />

                  <Flex
                    w="100%"
                    direction="row"
                    flexWrap="wrap"
                    gap={3}
                  >
                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="green.800"
                      opacity={0.7}
                    >
                      Pokój nauczycielski
                    </Box>

                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="green.800"
                      opacity={0.7}
                    >
                      Pomieszczenie gospodarcze
                    </Box>

                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="green.800"
                      opacity={0.7}
                    >
                      Pracownia biologiczna
                    </Box>
                  </Flex>

                  <Heading size="sm" mt={10}>Grupy</Heading>

                  <Divider/>

                  <Input
                    size="sm"
                    variant="filled"
                  />

                  <Flex
                    w="100%"
                    direction="row"
                    flexWrap="wrap"
                    gap={3}
                  >
                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="red.800"
                      opacity={0.7}
                    >
                      Komputery
                    </Box>

                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="red.800"
                      opacity={0.7}
                    >
                      Drukarki
                    </Box>

                    <Box
                      fontSize={14}
                      py={1}
                      px={2}
                      borderRadius={3}
                      bg="red.800"
                      opacity={0.7}
                    >
                      Ławki
                    </Box>
                  </Flex>
                </Flex>
              </TabPanel>

              <TabPanel
                h="95%"
                boxSizing="border-box"
                border="1px"
                borderColor="gray.600"
                borderBottomRadius={6}
              >
                <Flex
                  h="100%"
                  direction="column"
                  gap={3}
                >
                  <SearchBar
                    value={searchPhrase}
                    onChange={(e) => setSearchPhrase(e.target.value)}
                    onClear={() => setSearchPhrase('')}
                  />

                  <Flex
                    h="100%"
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    <Heading size="md" fontWeight="semibold">
                      Brak dopasowań
                    </Heading>

                    {searchPhrase == '' &&
                      <Text>
                        Wpisz frazę wyszukiwania w polu powyżej
                      </Text>
                    }

                    {searchPhrase != '' &&
                      <Text>
                        Dla frazy "{searchPhrase}"
                      </Text>
                    }
                  </Flex>
                </Flex>
              </TabPanel>

              <TabPanel
                h="95%"
                boxSizing="border-box"
                border="1px"
                borderColor="gray.600"
                borderBottomRadius={6}
              >
                <Flex
                  h="100%"
                  direction="column"
                  justifyContent="start"
                  gap={3}
                >
                  <Stat>
                    <StatLabel>Ilość przedmiotów</StatLabel>
                    <StatNumber>3200</StatNumber>
                  </Stat>

                  <Divider/>

                  <Stat>
                    <StatLabel>Łączna wartość przedmiotów</StatLabel>
                    <StatNumber>103002,34 PLN</StatNumber>
                  </Stat>
                </Flex>
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
