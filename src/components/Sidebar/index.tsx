import { useBoolean, Card, Flex, IconButton, Divider, Spacer, Avatar, Button, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  HiOutlineChevronDoubleRight,
  HiOutlineChevronDoubleLeft,
  HiOutlineHome,
  HiHome,
  HiQueueList,
  HiOutlineQueueList,
  HiChartPie,
  HiOutlineChartPie,
  HiOutlineClipboardDocument,
  HiClipboardDocument,
} from 'react-icons/hi2';



const TABS = [
  {
    name: 'dashboard',
    label: 'Panel',
    icon: HiOutlineHome,
    activeIcon: HiHome,
  },
  {
    name: 'inventory',
    label: 'Inwentaryzacja',
    icon: HiOutlineQueueList,
    activeIcon: HiQueueList,
  },
  {
    name: 'reports',
    label: 'Raporty',
    icon: HiOutlineChartPie,
    activeIcon: HiChartPie,
  },
  {
    name: 'actions',
    label: 'Operacje',
    icon: HiOutlineClipboardDocument,
    activeIcon: HiClipboardDocument,
  },
]



const Sidebar = ({ onTabChange }: { onTabChange: (tab: string) => void }) => {
  const session = useSession();
  const [selectedTab, setSelectedTab] = useState(TABS[0]?.name);
  const [expand, setExpand] = useBoolean(false);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    onTabChange(tab);
  }

  return (
    <Card
      variant="outline"
      w={expand ? 64 : 16}
      h="100%"
      p={3}
    >
      {expand == false &&
        <Flex
          h="100%"
          direction="column"
          gap={3}
          w={10}
        >
          <IconButton
            variant="ghost"
            icon={expand ? <HiOutlineChevronDoubleLeft size={20}/> : <HiOutlineChevronDoubleRight size={20}/>}
            aria-label="Expand sidebar"
            onClick={setExpand.toggle}
          />

          <Divider/>

          {TABS.map((tab, index) => (
            <IconButton
              variant={selectedTab == tab.name ? 'solid' : 'ghost'}
              colorScheme={selectedTab == tab.name ? 'blue' : 'gray'}
              key={index}
              icon={selectedTab == tab.name ? tab.activeIcon({ size: 22 }) : tab.icon({ size: 20 })}
              aria-label={tab.name}
              onClick={() => handleTabChange(tab.name)}
            />
          ))}

          <Spacer/>

          <IconButton
            variant={selectedTab == 'user' ? 'solid' : 'ghost'}
            colorScheme={selectedTab == 'user' ? 'blue' : 'gray'}
            icon={<Avatar size="xs"/>}
            aria-label="user"
            onClick={() => handleTabChange('user')}
          />
        </Flex>
      }

      {expand == true &&
        <Flex
          direction="column"
          h="100%"
          w="100%"
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
              aria-label="Collapse sidebar"
              onClick={setExpand.off}
            />

            <Heading
              size="md"
            >
              Inventory System
            </Heading>
          </Flex>

          <Divider/>

          {TABS.map((tab, index) => (
            <Button
              key={index}
              variant={selectedTab == tab.name ? 'solid' : 'ghost'}
              colorScheme={selectedTab == tab.name ? 'blue' : 'gray'}
              leftIcon={selectedTab == tab.name ? tab.activeIcon({ size: 22 }) : tab.icon({ size: 20 })}
              justifyContent="start"
              onClick={() => handleTabChange(tab.name)}
            >
              {tab.label}
            </Button>
          ))}

          <Spacer/>

          <Button
            variant={selectedTab == 'user' ? 'solid' : 'ghost'}
            colorScheme={selectedTab == 'user' ? 'blue' : 'gray'}
            leftIcon={<Avatar size="xs"/>}
            justifyContent="start"
            onClick={() => handleTabChange('user')}
          >
            {session.data?.user?.name}
          </Button>
        </Flex>
      }
    </Card>
  );
}



export default Sidebar;
