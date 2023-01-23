import { type Theme, extendTheme } from '@chakra-ui/react';
import config from './config';

const theme = extendTheme({
  config,
}) as Theme;

export default theme;
