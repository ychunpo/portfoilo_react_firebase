import React from 'react';
import { extendTheme } from "@chakra-ui/react";
import { StyleConfig } from "@chakra-ui/theme-tools";

const breakpoints = {
  xs: '599',
  sm: '1023',
  md: '1439',
  lg: '1919',
}

export const allTheme = extendTheme({
  breakpoints,
  components: {
    FormLabel: {
      fontSize: 'lg',
    },
  },
})

