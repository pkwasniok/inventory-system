import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Input,
  type InputProps,
} from '@chakra-ui/react';

import {
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
} from 'react-icons/hi2';



interface SearchBarProps extends InputProps {
  onClear: () => void;
}

export const SearchBar = ({ value, onClear, ...props }: SearchBarProps) => {
  return (
    <InputGroup>
      <InputLeftElement>
        <HiOutlineMagnifyingGlass size={18}/>
      </InputLeftElement>

      <Input
        value={value}
        {...props}
      />

      {value != 0 &&
        <InputRightElement>
          <IconButton
            size="xs"
            icon={<HiOutlineXMark size={18}/>}
            aria-label="Clear searchbar"
            onClick={onClear}
          />
        </InputRightElement>
      }
    </InputGroup>
  );
}



export default SearchBar;
