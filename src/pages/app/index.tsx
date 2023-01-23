import { type NextPage } from 'next';
import { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { Sidebar } from '../../components';
import { HiOutlineQueueList, HiOutlineChartPie, HiOutlineClipboardDocument } from 'react-icons/hi2';



const App: NextPage = () => {
  const session = useSession({ required: false });
  const [view, setView] = useState<'inventory'|'reports'|'actions'|'user'>('inventory');

  return (
    <Flex
      position="fixed"
      inset={0}
      direction="row"
      bg="blue.50"
    >
      <Sidebar
        view={view}
        onViewChange={(view) => setView(view)}
      />

      {view == 'inventory' &&
        <Box p={3}>
          Inventory
        </Box>
      }

      {view == 'reports' &&
        <Box p={3}>
          Reports
        </Box>
      }

      {view == 'actions' &&
        <Box p={3}>
          Actions
        </Box>
      }

      {view == 'user' &&
        <Box p={3}>
          User
        </Box>
      }
    </Flex>
  )
}



export default App;
