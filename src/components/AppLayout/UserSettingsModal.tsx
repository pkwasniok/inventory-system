import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';



interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserSettingsModal = ({ ...props }: UserSettingsModalProps) => {
  return (
    <Modal
      size="xl"
      {...props}
    >
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>
          Twoje konto
        </ModalHeader>

        <ModalBody></ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
