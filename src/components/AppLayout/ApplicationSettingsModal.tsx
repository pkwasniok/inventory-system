import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';



interface ApplicationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationSettingsModal = ({ ...props }: ApplicationSettingsModalProps) => {
  return (
    <Modal
      size="xl"
      {...props}
    >
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>
          Ustawienia aplikacji
        </ModalHeader>

        <ModalBody></ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
