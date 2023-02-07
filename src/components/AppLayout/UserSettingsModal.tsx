import { api } from '@/utils/api';

import { Form } from '@/features/form';

import { type UserUpdateInput, UserUpdateSchema, UserPasswordUpdateSchema } from '@/schemas/user';

import { signOut } from 'next-auth/react';

import {
  useColorModeValue,
  useToast,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Divider,
  Input,
  Button,
} from '@chakra-ui/react';

import {
  HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';




interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettingsModal = ({ ...props }: UserSettingsModalProps) => {
  const toast = useToast();

  const color = useColorModeValue('gray.600', 'gray.400');

  const user = api.user.get.useQuery();
  const { mutate: updateUser } = api.user.update.useMutation({
    onSuccess: () => {
      user.refetch();
      toast({
        status: 'success',
        title: 'Zapisano zmiany',
      });
    },
  });
  const { mutate: changePassword } = api.user.changePassword.useMutation({
    onSuccess: () => {
      toast({
        status: 'success',
        title: 'Zmieniono hasło',
      });
    }
  });

  return (
    <Modal
      size="xl"
      isCentered
      {...props}
    >
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            Twoje konto

            <Button
              aria-label="Log out"
              size="sm"
              variant="ghost"
              color={color}
              rightIcon={<HiOutlineArrowRightOnRectangle size={20}/>}
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              Wyloguj się
            </Button>
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex
            direction="column"
            gap={3}
          >
            <Heading
              size="sm"
              fontWeight="semibold"
            >
              Dane
            </Heading>

            <Divider/>

            <Form
              schema={UserUpdateSchema}
              defaultValues={user.data as UserUpdateInput}
              onSubmit={updateUser}
            >
              <Form.Field
                name="name"
                label="Imię i nazwisko"
              >
                <Input/>
              </Form.Field>

              <Form.Field
                name="email"
                label="Adres email"
              >
                <Input disabled/>
              </Form.Field>

              <Form.Submit
                colorScheme="gray"
                align="right"
              >
                Zapisz
              </Form.Submit>
            </Form>

            <Heading
              size="sm"
              fontWeight="semibold"
            >
              Zmiana hasła
            </Heading>

            <Divider/>

            <Form
              schema={UserPasswordUpdateSchema}
              onSubmit={changePassword}
              resetOnSubmit
            >
              <Form.Field
                name="currentPassword"
                label="Aktualne hasło"
              >
                <Input type="password" />
              </Form.Field>

              <Form.Field
                name="newPassword"
                label="Nowe hasło"
              >
                <Input type="password" />
              </Form.Field>

              <Form.Submit
                align="right"
              >
                Zmień hasło
              </Form.Submit>
            </Form>

            {/* <Heading
              size="sm"
              fontWeight="semibold"
            >
              Strefa niebezpieczna
            </Heading>

            <Divider/>

            <Flex
              direction="row"
              gap={6}
            >
              <Button
                colorScheme="red"
              >
                Usuń konto
              </Button>
            </Flex> */}
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
