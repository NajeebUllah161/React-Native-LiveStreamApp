import React from 'react';

import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Pressable,
} from 'native-base';
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer() {
  const [selected, setSelected] = React.useState(1);
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="white" safeAreaTop>
        <Center flex={1}>
        </Center>
        <HStack bg="primary.500" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable
            // cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py={2}
            flex={1}
            onPress={() => setSelected(0)}
          >
            <Center>
              <Icon name="home" size={30} color="white" />
              <Text color="white" fontSize={14}>Home</Text>
            </Center>
          </Pressable>
          <Pressable
            // cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py={2}
            flex={1}
            onPress={() => setSelected(1)}
          >
            <Center>
              <Icon name="wifi" size={30} color="white" />
              <Text color="white" fontSize={14}>Live Video</Text>
            </Center>
          </Pressable>
          <Pressable
            // cursor="pointer"
            opacity={selected === 2 ? 1 : 0.6}
            py={2}
            flex={1}
            onPress={() => setSelected(2)}
          >
            <Center>
              <Icon name="upload" size={30} color="white" />
              <Text color="white" fontSize={14}>Upload</Text>
            </Center>
          </Pressable>
          <Pressable
            // cursor="pointer"
            opacity={selected === 3 ? 1 : 0.5}
            py={2}
            flex={1}
            onPress={() => setSelected(3)}
          >
            <Center>
              <Icon name="dollar" size={30} color="white" />
              <Text color="white" fontSize={14}>Earning</Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}
