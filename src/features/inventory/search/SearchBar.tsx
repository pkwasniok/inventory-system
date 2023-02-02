import { useRef } from 'react';

import {
  InputGroup,
  Input,
  InputLeftElement,
  InputRightElement,
  IconButton,
  type InputProps,
} from '@chakra-ui/react';

import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from 'react-icons/hi2';



interface SearchBarProps extends InputProps {
  onClear: () => void;
};

const SearchBar = ({ value, onChange, onClear, ...props }: SearchBarProps) => {
  return (
    <InputGroup>
      <InputLeftElement>
        <HiOutlineMagnifyingGlass size={20}/>
      </InputLeftElement>

      <Input
        value={value}
        onChange={onChange}
        {...props}
      />

      {value !== '' &&
        <InputRightElement>
          <IconButton
            size="xs"
            icon={<HiOutlineXMark size={20}/>}
            onClick={onClear}
            aria-label="Clear phrase"
          />
        </InputRightElement>
      }
    </InputGroup>
  );
}



export default SearchBar;
