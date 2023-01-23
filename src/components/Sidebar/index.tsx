import { type ReactElement, type ReactNode } from 'react';
import { Flex, Heading, Button, Spacer, Avatar, Text, type ButtonProps } from '@chakra-ui/react';
import { HiOutlineQueueList, HiOutlineChartPie, HiOutlineClipboardDocument } from 'react-icons/hi2';



type View = 'inventory'|'reports'|'actions'|'user';

interface SidebarProps {
  view?: View;
  onViewChange: (view: View) => void;
}

const Sidebar = ({ onViewChange }: SidebarProps) => {
  return (
    <Flex
      w={270}
      h="100%"
      direction="column"
      bg="blue.500"
      p={3}
      gap={3}
      color="blue.50"
      borderRight={1}
      borderRightColor="gray.100"
    >
      <Heading
        size="md"
      >
        Inventory System
      </Heading>

      <SidebarButton
        icon={<HiOutlineQueueList size={20}/>}
        onClick={() => onViewChange('inventory')}
      >
        Inwentaryzacja
      </SidebarButton>

      <SidebarButton
        icon={<HiOutlineChartPie size={20}/>}
        onClick={() => onViewChange('reports')}
      >
        Raporty
      </SidebarButton>

      <SidebarButton
        icon={<HiOutlineClipboardDocument size={20}/>}
        onClick={() => onViewChange('actions')}
      >
        Operacje
      </SidebarButton>

      <Spacer/>

      <Button
        variant="ghost"
        color="blue.50"
        colorScheme="whiteAlpha"
        size="lg"
        px={2}
        onClick={() => onViewChange('user')}
      >
        <Flex
          w="100%"
          direction="row"
          gap={3}
        >
          <Avatar
            size="sm"
          />

          <Flex
            direction="column"
            alignItems="start"
          >
            <Text
              fontSize="md"
            >
              Patryk Kwaśniok
            </Text>

            <Text
              fontSize="xs"
              color="blue.100"
            >
              kwasniokpatryk@gmail.com
            </Text>
          </Flex>
        </Flex>
      </Button>
    </Flex>
  )
}



interface SidebarButtonProps extends ButtonProps {
  icon: ReactElement;
}

const SidebarButton = ({ children, icon, ...props }: SidebarButtonProps) => {
  return (
    <Button
      variant="ghost"
      color="blue.50"
      colorScheme="whiteAlpha"
      justifyContent="start"
      leftIcon={icon}
      {...props}
    >
      {children}
    </Button>
  );
}



export default Sidebar;
