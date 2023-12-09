import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const colors = {
  dark: {
    cardBackground: '#171923',
  },
}

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}
const theme = extendTheme({ config, colors })

export default theme;