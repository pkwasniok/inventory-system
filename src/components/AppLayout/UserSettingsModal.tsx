import { api } from '@/utils/api';

import { Form } from '@/features/form';

import { userUpdateSchema, UserUpdateInput } from '@/utils/schemas';

import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Divider,
  Text,
  Input
} from '@chakra-ui/react';



interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettingsModal = ({ ...props }: UserSettingsModalProps) => {
  const user = api.user.get.useQuery();
  const { mutate: updateUser } = api.user.update.useMutation();

  return (
    <Modal
      size="xl"
      isCentered
      {...props}
    >
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>
          {user.data?.name ?? 'Twoje konto'}
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
              Twoje informacje
            </Heading>

            <Divider/>

            <Form
              schema={userUpdateSchema}
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

            <Form>
              <Form.Field name="currentPassword">
                <Input type="password" />
              </Form.Field>

              <Form.Field name="newPassword">
                <Input type="password" />
              </Form.Field>

              <Form.Field name="repeatNewPassword">
                <Input type="password" />
              </Form.Field>

              <Form.Submit
                align="right"
              >
                Zmień hasło
              </Form.Submit>
            </Form>
          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
