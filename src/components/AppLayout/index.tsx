import { type ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Organization } from '@prisma/client';

import {
  useDisclosure,
  Center,
  Flex,
  Spinner,
  Spacer,
  Button,
  IconButton, Avatar,
  Breadcrumb,
  BreadcrumbItem,
} from '@chakra-ui/react';

import {
  HiOutlineHome,
  HiOutlineCog6Tooth,
  HiOutlineQuestionMarkCircle,
  HiOutlineChevronRight,
  HiOutlineBuildingOffice2
} from 'react-icons/hi2';

import { ApplicationSettingsModal } from './ApplicationSettingsModal';

import { UserSettingsModal } from './UserSettingsModal';

import { HelpModal } from './HelpModal';



interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  organization?: Organization;
  loading?: boolean;
}

const AppLayout = ({ children, title, organization, loading }: AppLayoutProps) => {
  const router = useRouter();
  const session = useSession({ required: true });
  const userSettingsModal = useDisclosure();
  const applicationSettingsModal = useDisclosure();
  const helpModal = useDisclosure();

  if (session.status == 'loading' || loading == true) {
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
      <ApplicationSettingsModal
        isOpen={applicationSettingsModal.isOpen}
        onClose={applicationSettingsModal.onClose}
      />

      <UserSettingsModal
        isOpen={userSettingsModal.isOpen}
        onClose={userSettingsModal.onClose}
      />

      <HelpModal
        isOpen={helpModal.isOpen}
        onClose={helpModal.onClose}
      />

      <Flex
        w="100%"
        h={12}
        overflow="hidden"
        direction="row"
        alignItems="center"
        px={3}
        gap={3}
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <Breadcrumb spacing="8px" separator={<HiOutlineChevronRight size={18}/>}>
          <BreadcrumbItem>
            <IconButton
              as={NextLink}
              href="/app"
              size="sm"
              icon={<HiOutlineHome size={20}/>}
              aria-label=""
            />
          </BreadcrumbItem>

          {organization != undefined &&
            <BreadcrumbItem>
              <Button
                as={NextLink}
                href={`/app/${organization.id}`}
                variant="link"
                size="sm"
                leftIcon={<HiOutlineBuildingOffice2 size={20}/>}
                transform="auto"
                color="gray.700"
              >
                {organization.name}
              </Button>
            </BreadcrumbItem>
          }

          {title != undefined &&
            <BreadcrumbItem>
              <Button
                as={NextLink}
                href={router.asPath}
                variant="link"
                size="sm"
                color="gray.700"
              >
                {title}
              </Button>
            </BreadcrumbItem>
          }
        </Breadcrumb>

        <Spacer/>

        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="gray"
          icon={<HiOutlineQuestionMarkCircle size={20}/>}
          aria-label="Help"
          onClick={helpModal.onOpen}
        />

        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="gray"
          icon={<HiOutlineCog6Tooth size={20}/>}
          aria-label="Application settings"
          onClick={applicationSettingsModal.onOpen}
        />

        <IconButton
          size="sm"
          variant="ghost"
          colorScheme="gray"
          icon={<Avatar size="xs" name={session.data.user?.name ?? undefined}/>}
          aria-label="User settings"
          onClick={userSettingsModal.onOpen}
        />
      </Flex>

      {children}
    </Flex>
  );
}



export default AppLayout;
