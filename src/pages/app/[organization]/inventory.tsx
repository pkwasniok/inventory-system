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
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Input,
  IconButton,
  Heading,
  Spacer,
  Button,
  Select,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
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

  const [ filters, setFilters ] = useState([0, 0, 0, 0]);

  const color = useColorModeValue('gray.700', 'gray.500');

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
                <Flex
                  h="100%"
                  direction="column"
                  gap={3}
                >
                  <Heading size="sm" fontWeight="semibold">Wyszukiwanie</Heading>

                  <SearchBar/>

                  <Heading size="sm" fontWeight="semibold" mt={6}>Filtry</Heading>

                  {filters.map((filter) => (
                    <Flex
                      w="100%"
                      h={12}
                      border="1px"
                      borderColor="gray.600"
                      rounded={6}
                      p={2}
                      gap={2}
                      alignItems="center"
                    >
                      <Select variant="filled" size="sm" flexShrink={1}>
                        <option>Grupa</option>
                        <option>Pomieszczenie</option>
                        <option>Księga</option>
                      </Select>

                      <Select variant="filled" size="sm" flexShrink={1}>
                        <option>=</option>
                        <option>≠</option>
                      </Select>

                      <Input
                        size="sm"
                        variant="filled"
                      />

                      <Spacer/>

                      <IconButton
                        variant="ghost"
                        size="sm"
                        aria-label="Delete filter"
                        color={color}
                        icon={<HiOutlineTrash size={20}/>}
                        onClick={() => setFilters(filters.splice(1))}
                      />
                    </Flex>
                  ))}

                  <Button
                    variant="ghost"
                    leftIcon={<HiOutlinePlus size={20}/>}
                    justifyContent="start"
                    onClick={() => setFilters([ ...filters, 0 ])}
                  >
                    Dodaj
                  </Button>
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
