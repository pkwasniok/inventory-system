import { useRouter } from 'next/router';
import NextLink from 'next/link';
import NextImage from 'next/image';
import { AppLayout } from '@/components';
import { api } from '@/utils/api';
import { OrganizationCreateSchema } from '@/schemas/organization';
import UndrawHello from '@public/undraw/undraw_hello.svg';
import { Form } from '@/features/form';

import {
  useToast,
  useDisclosure,
  Center,
  Flex,
  Card,
  Heading,
  SimpleGrid,
  Button,
  Image,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  Input,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';

import {
  HiOutlineBuildingOffice2,
  HiOutlineChevronRight,
  HiOutlinePlus
} from 'react-icons/hi2';



const Welcome = () => {
  const router = useRouter();
  const toast = useToast();
  const organizations = api.organization.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      if (data.length == 0) {
        router.push('/app/wizard');
      }
    }
  });
  const { mutate: createOrganization } = api.organization.create.useMutation({
    onSuccess: () => {
      organizations.refetch()
      toast({
        status: 'success',
        title: 'Utworzono organizację'
      });
      organizationCreateModal.onClose();
    }
  });
  const organizationCreateModal = useDisclosure();

  return (
    <AppLayout>
      <Modal
        isOpen={organizationCreateModal.isOpen}
        onClose={organizationCreateModal.onClose}
        isCentered
      >
        <ModalOverlay/>

        <ModalContent
          flexDirection="column"
        >
          <ModalHeader>Tworzenie organizacji</ModalHeader>

          <ModalBody>
            <Form
              schema={OrganizationCreateSchema}
              onSubmit={createOrganization}
            >
              <Form.Field
                name="name"
                label="Nazwa organizacji"
              >
                <Input/>
              </Form.Field>

              <Flex
                direction="row"
                gap={3}
                justifyContent="end"
                mb={2}
                mt={6}
              >
                <Button
                  variant="ghost"
                  onClick={organizationCreateModal.onClose}
                >
                  Anuluj
                </Button>

                <Button
                  colorScheme="blue"
                  type="submit"
                  rightIcon={<HiOutlinePlus size={20}/>}
                >
                  Utwórz organizację
                </Button>
              </Flex>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>

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
          <Center>
            <Image
              as={NextImage}
              w={[340, 380, 420]}
              alt=""
              src={UndrawHello}
              my={20}
            />
          </Center>

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
              onClick={organizationCreateModal.onOpen}
            >
              Utwórz organizację
            </Button>
          </Flex>

          <Divider/>

          <SimpleGrid
            w="100%"
            p={3}
            columns={[1, 1, 2, 3]}
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
                      href={`/app/${organization.id}/inventory`}
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
