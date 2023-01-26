import { type ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';



interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Flex>
      {children}
    </Flex>
  );
}



export default AppLayout;
