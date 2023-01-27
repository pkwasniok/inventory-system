import { AppLayout } from '../../components';
import { Center, Flex, Card, Heading, SimpleGrid, Button, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { api } from '../../utils/api';
import { HiOutlineBuildingOffice2, HiOutlineChevronRight, HiOutlinePlus } from 'react-icons/hi2';
import NextLink from 'next/link';



const Welcome = () => {
  const router = useRouter();
  const organizations = api.organization.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      if (data.length == 0) {
        router.push('/app/wizard');
      }
    }
  });




  return (
    <AppLayout title="Strona główna">
      <Center
        w="100%"
        h="100%"
      >
        <Flex
          maxW="1200px"
          w="100%"
          h="100%"
          px={3}
          py={6}
          direction="column"
          gap={3}
        >
          {/* Organizations section */}
          <Flex
            gap={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Heading
              size="md"
            >
              Twoje organizacje
            </Heading>

            <Button
              variant="ghost"
              size="sm"
              rightIcon={<HiOutlinePlus size={20}/>}
            >
              Utwórz organizację
            </Button>
          </Flex>

          <SimpleGrid
            w="100%"
            p={3}
            columns={[1, 2, 2, 3]}
            gap={6}
          >
            {organizations.data != undefined && organizations.data.map((organization) => (
              <Card
                variant="outline"
                p={3}
              >
                <Flex
                  h="100%"
                  direction="column"
                  justifyContent="space-between"
                  gap={6}
                >
                  <Flex
                    direction="row"
                    gap={3}
                  >
                    <HiOutlineBuildingOffice2 size={20}/>

                    <Heading
                      size="sm"
                      fontWeight="semibold"
                    >
                      {organization.name}
                    </Heading>
                  </Flex>

                  <Flex
                    gap={3}
                    w="100%"
                    justifyContent="end"
                  >
                    <Button
                      as={NextLink}
                      href={`/app/${organization.id}/settings`}
                      variant="ghost"
                      size="sm"
                    >
                      Ustawienia
                    </Button>

                    <Button
                      as={NextLink}
                      href={`/app/${organization.id}`}
                      size="sm"
                      rightIcon={<HiOutlineChevronRight size={18}/>}
                    >
                      Inwentaryzacja
                    </Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </SimpleGrid>
        </Flex>
      </Center>
    </AppLayout>
  );
}



export default Welcome;
