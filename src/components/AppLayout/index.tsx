import { type ReactNode } from 'react';
import { Center, Flex, Spinner, Spacer, Button, IconButton, Avatar } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { HiOutlineBuildingOffice2, HiOutlineCog6Tooth, HiOutlineQuestionMarkCircle } from 'react-icons/hi2';



interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
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
    );
  }

  return (
    <Flex
      position="fixed"
      inset={0}
      direction="column"
    >
      <Flex
        w="100%"
        h={12}
        direction="row"
        alignItems="center"
        px={3}
        gap={3}
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <Button
          size="sm"
          variant="ghost"
          colorScheme="gray"
          leftIcon={<HiOutlineBuildingOffice2 size={20}/>}
        >
          Zespół Szkół im. I. J. Paderewskiego w Knurowie
        </Button>

        <Spacer/>

        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="gray"
          icon={<HiOutlineQuestionMarkCircle size={20}/>}
          aria-label="User settings"
        />

        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="gray"
          icon={<HiOutlineCog6Tooth size={20}/>}
          aria-label="User settings"
        />

        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="gray"
          icon={<Avatar size="xs" name={session.data.user?.name ?? undefined}/>}
          aria-label="User settings"
        />
      </Flex>

      {children}
    </Flex>
  );
}



export default AppLayout;
