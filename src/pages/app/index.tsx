import { type NextPage } from 'next';
import { Center, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { HiOutlineQueueList, HiOutlineChartPie, HiOutlineCog6Tooth } from 'react-icons/hi2';


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
        <Button
          variant="ghost"
          color="white"
          colorScheme="whiteAlpha"
          w="100%"
          justifyContent="start"
          leftIcon={<HiOutlineQueueList size={22}/>}
        >
          Przedmioty
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
      </Flex>
    </Flex>
  )
}



export default App;
