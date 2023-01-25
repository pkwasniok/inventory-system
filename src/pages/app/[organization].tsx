import { Box, Center, Spinner, Card, Flex, IconButton, Spacer, Avatar, useBoolean, Button, Heading, Divider, Select, Menu, MenuButton, MenuList, MenuItem, MenuDivider, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { HiOutlineChevronDoubleRight, HiOutlineChevronDoubleLeft, HiOutlineHome, HiOutlineChartPie, HiOutlineClipboardDocument, HiOutlineQueueList, HiOutlinePlus, HiCog6Tooth, HiOutlineCog6Tooth } from 'react-icons/hi2';



const App = () => {
  const [sidebar, setSidebar] = useBoolean(false);
  const session = useSession({ required: true });

  if (session.status == 'loading') {
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
    <Box
      position="fixed"
      inset={0}
      p={3}
      color="gray.700"
    >
      <Card
        w={sidebar ? 64 : 16}
        h="100%"
        variant="outline"
      >
        {sidebar &&
          <Flex
            h="100%"
            direction="column"
            p={3}
            gap={3}
          >
            <Flex
              direction="row"
              alignItems="center"
              gap={3}
            >
              <IconButton
                variant="ghost"
                icon={<HiOutlineChevronDoubleLeft size={20}/>}
                aria-label="Close sidebar"
                onClick={setSidebar.toggle}
              />

              <Heading
                size="md"
                transform="auto"
                translateY="-3px"
                color="gray.700"
              >
                Inventory System
              </Heading>
            </Flex>

            <Divider/>

            <Menu>
              <MenuButton>
                Zespół Szkół im. I. J. Paderewskiego w Knurowie
              </MenuButton>

              <MenuList>
                <MenuOptionGroup title="Organizacja" defaultValue='1'>
                  <MenuItemOption value='1'>Zespół Szkół im. I. J. Paderewskiego w Knurowie</MenuItemOption>
                  <MenuItemOption value='2'>Uniwersytet papieski</MenuItemOption>
                </MenuOptionGroup>

                <MenuDivider/>

                <MenuItem
                  icon={<HiOutlineCog6Tooth size={18}/>}
                >
                  Ustawienia organizacji
                </MenuItem>

                <MenuItem
                  icon={<HiOutlinePlus size={18}/>}
                >
                  Utwórz organizację
                </MenuItem>
              </MenuList>
            </Menu>

            <Divider/>

            <Button
              variant="solid"
              colorScheme="blue"
              leftIcon={<HiOutlineHome size={20}/>}
              justifyContent="start"
            >
              Panel
            </Button>

            <Button
              variant="ghost"
              leftIcon={<HiOutlineQueueList size={20}/>}
              justifyContent="start"
            >
              Inwentaryzacja
            </Button>

            <Button
              variant="ghost"
              leftIcon={<HiOutlineChartPie size={20}/>}
              justifyContent="start"
            >
              Raporty
            </Button>

            <Button
              variant="ghost"
              leftIcon={<HiOutlineClipboardDocument size={20}/>}
              justifyContent="start"
            >
              Operacje
            </Button>

            <Spacer/>

            <Button
              variant="ghost"
              leftIcon={<Avatar size="xs"/>}
              justifyContent="start"
            >
              {session.data.user?.name}
            </Button>
          </Flex>
        }

        {!sidebar &&
          <Flex
            h="100%"
            direction="column"
            p={3}
            gap={3}
          >
            <IconButton
              variant="ghost"
              icon={<HiOutlineChevronDoubleRight size={20}/>}
              aria-label="Open sidebar"
              onClick={setSidebar.toggle}
            />

            <Divider/>

            <IconButton
              variant="solid"
              colorScheme="blue"
              icon={<HiOutlineHome size={20}/>}
              aria-label="Dashboard"
            />

            <IconButton
              variant="ghost"
              icon={<HiOutlineQueueList size={20}/>}
              aria-label="Dashboard"
            />

            <IconButton
              variant="ghost"
              icon={<HiOutlineChartPie size={20}/>}
              aria-label="Dashboard"
            />

            <IconButton
              variant="ghost"
              icon={<HiOutlineClipboardDocument size={20}/>}
              aria-label="Dashboard"
            />

            <Spacer />

            <IconButton
              variant="ghost"
              icon={<Avatar size="xs"/>}
              aria-label="Profile"
            />
          </Flex>
        }
      </Card>
    </Box>
  )
}



export default App;
