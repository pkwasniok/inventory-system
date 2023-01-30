import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';



interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ ...props }: HelpModalProps) => {
  return (
    <Modal
      size="xl"
      {...props}
    >
      <ModalOverlay/>

      <ModalContent>
        <ModalHeader>
          Pomoc
        </ModalHeader>

        <ModalBody></ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
