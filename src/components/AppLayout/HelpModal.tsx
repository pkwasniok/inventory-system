import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import {
  HiOutlineQuestionMarkCircle,
} from 'react-icons/hi2';



interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ ...props }: HelpModalProps) => {
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
            gap={3}
            alignItems="center"
          >
            <HiOutlineQuestionMarkCircle size={22}/>
            Pomoc
          </Flex>
        </ModalHeader>

        <ModalBody></ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
