import { type ReactNode, useState } from 'react';
import { Flex, Card, IconButton, Divider, Spacer, Avatar } from '@chakra-ui/react';
import { HiOutlineChevronDoubleRight, HiHome, HiOutlineHome, HiOutlineQueueList, HiQueueList, HiClipboardDocument, HiOutlineClipboardDocument, HiChartPie, HiOutlineChartPie } from 'react-icons/hi2';
import { type IconType } from 'react-icons';



const VIEWS = [
  {
    name: 'dashboard',
    label: 'Strona główna',
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



interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [ view, setView ] = useState(VIEWS[0]?.name ?? '');

  return (
    <Flex
      position="fixed"
      inset={0}
      p={3}
      direction="row"
      gap={3}
    >
      <Card
        variant="outline"
        h="100%"
        w={16}
      >
        <Flex
          h="100%"
          w={16}
          p={3}
          direction="column"
          gap={3}
        >
          <IconButton
            variant="ghost"
            icon={<HiOutlineChevronDoubleRight size={20}/>}
            aria-label="expand menu"
          />

          <Divider/>

          {VIEWS.map(({ name, label, icon, activeIcon }: { name: string, label: string, icon: IconType, activeIcon: IconType }, index: number) => (
            <IconButton
              key={index}
              variant={view == name ? 'solid': 'ghost'}
              colorScheme={view == name ? 'blue' : 'gray'}
              icon={view == name ? activeIcon({ size: 20 }) : icon({ size: 20 })}
              aria-label={label}
              onClick={() => setView(name)}
            />
          ))}

          <Spacer/>

          <IconButton
            variant={view == 'user' ? 'solid' : 'ghost'}
            colorScheme={view == 'user' ? 'blue' : 'gray'}
            icon={<Avatar size="xs"/>}
            aria-label="Profile"
            onClick={() => setView('user')}
          />
        </Flex>
      </Card>

      {children}
    </Flex>
  );
}



export default AppLayout;
