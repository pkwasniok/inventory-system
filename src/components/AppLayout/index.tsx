import { type ReactNode, useState } from 'react';
import { Flex, Card, IconButton, Divider, Spacer, Avatar } from '@chakra-ui/react';
import { HiOutlineChevronDoubleRight, HiHome, HiOutlineHome, HiOutlineQueueList, HiQueueList, HiClipboardDocument, HiOutlineClipboardDocument, HiChartPie, HiOutlineChartPie } from 'react-icons/hi2';
import { type IconType } from 'react-icons';
import Sidebar from '../Sidebar';



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
      <Sidebar
        onTabChange={setView}
      />

      {view}
    </Flex>
  );
}



export default AppLayout;
