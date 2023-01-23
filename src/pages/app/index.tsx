import { type NextPage } from 'next';
import { Flex, Heading, Button, Spacer, Avatar, Box, Divider } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { HiOutlineQueueList, HiOutlineChartPie, HiOutlineCog6Tooth, HiOutlineClipboardDocument, HiOutlineChevronRight } from 'react-icons/hi2';


const App: NextPage = () => {
  const session = useSession({ required: false });

  return (
    <Flex
      position="fixed"
      inset={0}
      direction="row"
    >
      <Flex
        h="screen"
        w="300px"
        bg="blue.500"
        direction="column"
        alignItems="center"
        gap={2}
        p={5}
      >
        <Heading
          size="md"
          textAlign="left"
          w="100%"
          color="white"
          mb={5}
        >
          Inventory System
        </Heading>

        <Button
          variant="ghost"
          color="white"
          colorScheme="whiteAlpha"
          w="100%"
          justifyContent="start"
          leftIcon={<HiOutlineQueueList size={22}/>}
        >
          Inwentaryzacja
        </Button>

        <Button
          variant="ghost"
          color="white"
          colorScheme="whiteAlpha"
          w="100%"
          justifyContent="start"
          leftIcon={<HiOutlineChartPie size={22}/>}
        >
          Raporty
        </Button>

        <Button
          variant="ghost"
          color="white"
          colorScheme="whiteAlpha"
          w="100%"
          justifyContent="start"
          leftIcon={<HiOutlineClipboardDocument size={22}/>}
        >
          Operacje
        </Button>

        <Spacer/>

        <Button
          variant="ghost"
          color="white"
          colorScheme="whiteAlpha"
          w="100%"
          justifyContent="start"
          leftIcon={<HiOutlineCog6Tooth size={22}/>}
        >
          Ustawienia
        </Button>

        <Divider/>

        <Flex
          as={Button}
          size="lg"
          variant="ghost"
          color="white"
          colorScheme="whiteAlpha"
          w="100%"
          gap={3}
          justifyContent="end"
        >
          <Avatar
            size="sm"
            name="Patryk Kwaśniok"
          />

          <Flex
            direction="column"
            gap={0}
            textColor="gray.300"
            alignItems="start"
          >
            <Box lineHeight="16px" fontSize="md" textColor="blue.100">Patryk Kwaśniok</Box>
            <Box fontSize="sm" textColor="blue.200">kwasniokpatryk@gmail.com</Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}



export default App;
