'use client'

import { ChakraProvider, createSystem, defaultConfig, mergeConfigs } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

const config = mergeConfigs(defaultConfig)

const system = createSystem(config)

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
