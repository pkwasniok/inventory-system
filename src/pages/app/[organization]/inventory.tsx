import { useState } from 'react';

import { useRouter } from 'next/router';

import { AppLayout } from '@/components';

import { api } from '@/utils/api';

import {
  Center,
  Flex,
  Spinner,
  Card,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Divider,
} from '@chakra-ui/react';

import { SearchBar } from '@/features/inventory/search';
import { BookFilterInput } from '@/features/inventory/filter';
import { InventoryTable } from '@/features/inventory/table';



const Inventory = () => {
  const router = useRouter();
  const query = router.query as { organization: string };

  const [ searchPhrase, setSearchPhrase ] = useState('');

  const organization = api.organization.getById.useQuery(query.organization);
  const { mutate: createBook } = api.book.create.useMutation({ onSuccess: () => refetchBooks() });
  const { mutate: updateBooks } = api.book.update.useMutation({ onSuccess: () => refetchBooks() });
  const { mutate: deleteBooks } = api.book.delete.useMutation({ onSuccess: () => refetchBooks() });
  const { data: books, refetch: refetchBooks }= api.book.getByOrganization.useQuery(organization.data?.id ?? '', { enabled: false });

  const { mutate: createRooms } = api.room.create.useMutation({ onSuccess: () => refetchRooms() });
  const { mutate: updateRooms } = api.room.update.useMutation({ onSuccess: () => refetchRooms() });
  const { mutate: deleteRooms } = api.room.delete.useMutation({ onSuccess: () => refetchRooms() });
  const { data: rooms, refetch: refetchRooms }= api.room.getByOrganization.useQuery(organization.data?.id ?? '', { enabled: false });

  const handleBookFetch = async () => {
    refetchBooks();
  }

  const handleBookCreate = async () => {
    createBook({
      organizationId: organization.data!.id,
      books: [
        {
          name: 'Test'
        }
      ],
    });
  }

  const handleBookUpdate = () => {
    updateBooks({
      organizationId: organization.data!.id,
      books: books!.map((book) => ({ ...book, name: 'Księga' })),
    });
  }

  const handleBookDelete = () => {
    deleteBooks({
      organizationId: organization.data!.id,
      books: books!.map((book) => book.id),
    });
  }

  const handleRoomRefetch = () => {
    refetchRooms();
  }

  const handleRoomCreate = () => {
    createRooms({
      organizationId: organization.data!.id,
      rooms: [
        {
          name: 'Test',
        },
      ],
    });
  }

  const handleRoomUpdate = () => {
    updateRooms({
      organizationId: organization.data!.id,
      rooms: rooms!.map((room) => ({ ...room, name: 'Update' })),
    });
  }

  const handleRoomDelete = () => {
    deleteRooms({
      organizationId: organization.data!.id,
      rooms: rooms!.map((room) => room.id),
    });
  }

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
      organization={organization.data}
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
              <Tab>Filtry</Tab>
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
                <SearchBar
                  value={searchPhrase}
                  onChange={(e) => setSearchPhrase(e.target.value)}
                  onClear={() => setSearchPhrase('')}
                />
              </TabPanel>

              <TabPanel
                h="95%"
                boxSizing="border-box"
                border="1px"
                borderColor="gray.600"
                borderBottomRadius={6}
              >
                <Flex
                  w="100%"
                  h="100%"
                  direction="column"
                >
                  <BookFilterInput/>
                </Flex>
              </TabPanel>

              <TabPanel
                h="95%"
                boxSizing="border-box"
                border="1px"
                borderColor="gray.600"
                borderBottomRadius={6}
              >
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>

        <Card
          variant="outline"
          flex={1}
          h="100%"
          p={3}
          gap={3}
        >
          Ilość ksiąg: {books?.length ?? '0'}

          <Button
            onClick={handleBookFetch}
          >
            Fetch books
          </Button>

          <Button
            onClick={handleBookCreate}
          >
            Create book
          </Button>

          <Button
            onClick={handleBookUpdate}
          >
            Update book
          </Button>

          <Button
            onClick={handleBookDelete}
          >
            Delete book
          </Button>

          <Divider/>

          Ilość pomieszczeń: {rooms?.length ?? '0'}

          <Button
            onClick={handleRoomRefetch}
          >
            Fetch rooms
          </Button>

          <Button
            onClick={handleRoomCreate}
          >
            Create room
          </Button>

          <Button
            onClick={handleRoomUpdate}
          >
            Update room
          </Button>

          <Button
            onClick={handleRoomDelete}
          >
            Delete rooms
          </Button>

          {/* <InventoryTable/> */}
        </Card>
      </Flex>
    </AppLayout>
  )
}



export default Inventory;
