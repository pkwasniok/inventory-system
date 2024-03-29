import {
  useColorMode,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Divider,
  Switch,
  Text,
} from '@chakra-ui/react';

import {
  HiOutlineCog6Tooth,
} from 'react-icons/hi2';



interface ApplicationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApplicationSettingsModal = ({ ...props }: ApplicationSettingsModalProps) => {
  const { setColorMode, colorMode, forced } = useColorMode();

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
            <HiOutlineCog6Tooth size={22}/>

            Ustawienia aplikacji
          </Flex>
        </ModalHeader>

        <ModalBody>
          <Flex
            direction="column"
            gap={3}
          >
            <Heading size="sm">Wygląd</Heading>

            <Divider/>

            <Flex
              direction="row"
              gap={3}
              alignItems="center"
            >
              <Text>
                Ciemny motyw
              </Text>

              <Switch
                onChange={(e) => setColorMode(e.currentTarget.checked ? 'dark' : 'light')}
                isChecked={colorMode === 'dark'}
              />
            </Flex>

          </Flex>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
