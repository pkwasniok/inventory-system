import { type ReactNode } from 'react';
import { Center, Flex, Spinner, Spacer, Button, IconButton, Avatar, Heading } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { HiOutlineBuildingOffice2, HiOutlineCog6Tooth, HiOutlineQuestionMarkCircle, HiChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2';
import NextLink from 'next/link';
import { useRouter } from 'next/router';



interface AppLayoutProps {
  children: ReactNode;
  returnHref?: string;
  title?: string;
}

const AppLayout = ({ children, returnHref, title }: AppLayoutProps) => {
  const router = useRouter();
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
        {returnHref != undefined &&
          <IconButton
            as={NextLink}
            href={returnHref}
            size="sm"
            variant="solid"
            colorScheme="gray"
            icon={<HiChevronLeft size={20}/>}
            aria-label="Back"
          />
        }

        {router.query.organization == undefined && title != undefined &&
          <Heading
            color="gray.700"
            fontWeight="semibold"
            size="xs"
          >
            {title}
          </Heading>
        }

        {router.query.organization != undefined &&
          <Button
            size="sm"
            variant="ghost"
            colorScheme="gray"
            leftIcon={<HiOutlineBuildingOffice2 size={20}/>}
          >
            Zespół Szkół im. I. J. Paderewskiego w Knurowie
          </Button>
        }

        {router.query.organization != undefined && title != undefined &&
          <Flex
            direction="row"
            color="gray.500"
            gap={3}
            transform="auto"
            translateX="-9px"
          >
            <HiOutlineChevronRight size={18}/>
            <Heading color="gray.700" fontWeight="semibold" size="xs">{title}</Heading>
          </Flex>
        }

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
