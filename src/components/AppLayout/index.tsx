import { type ReactNode } from 'react';
import { Center, Flex, Spinner, Spacer, Button, IconButton, Avatar, Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { HiOutlineHome, HiOutlineCog6Tooth, HiOutlineQuestionMarkCircle, HiOutlineChevronRight, HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Organization } from '@prisma/client';



interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  organization?: Organization;
  loading?: boolean;
}

const AppLayout = ({ children, title, organization, loading }: AppLayoutProps) => {
  const router = useRouter();
  const session = useSession({ required: true });

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
        />

        <IconButton
          as={NextLink}
          href="/app/settings"
          size="sm"
          variant="ghost"
          colorScheme="gray"
          icon={<HiOutlineCog6Tooth size={20}/>}
          aria-label="Application settings"
        />

        <IconButton
          as={NextLink}
          href="/app/user"
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
