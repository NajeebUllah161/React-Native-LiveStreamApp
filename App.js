import React from 'react';

import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  Pressable,
} from 'native-base';

import { NativeRouter, Route, Link } from "react-router-native";
// Import vector icons
import Icon from 'react-native-vector-icons/FontAwesome';

//pages
import Home from './components/pages/Home';
import LiveVideo from './components/pages/LiveVideo';
import Upload from './components/pages/Upload';
import Earning from './components/pages/Earning';


export default function Footer() {
  const [selected, setSelected] = React.useState(1);
  return (
    <NativeRouter>
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
              <Link to="/" underlayColor="#f0f4f7" >
                <Center>
                  <Icon name="home" size={30} color="white" />
                  <Text color="white" fontSize={14}>Home</Text>
                </Center>
              </Link>
            </Pressable>
            <Pressable
              // cursor="pointer"
              opacity={selected === 1 ? 1 : 0.5}
              py={2}
              flex={1}
              onPress={() => setSelected(1)}
            >

              <Link to="/livevideo" underlayColor="#f0f4f7">
                <Center>
                  <Icon name="wifi" size={30} color="white" />
                  <Text color="white" fontSize={14}>Live Video</Text>
                </Center>
              </Link>
            </Pressable>
            <Pressable
              // cursor="pointer"
              opacity={selected === 2 ? 1 : 0.6}
              py={2}
              flex={1}
              onPress={() => setSelected(2)}
            >

              <Link to="/upload" underlayColor="#f0f4f7">
                <Center>
                  <Icon name="upload" size={30} color="white" />
                  <Text color="white" fontSize={14}>Upload</Text>
                </Center>
              </Link>
            </Pressable>
            <Pressable
              // cursor="pointer"
              opacity={selected === 3 ? 1 : 0.5}
              py={2}
              flex={1}
              onPress={() => setSelected(3)}
            >
              <Link to="/earning" underlayColor="#f0f4f7">
                <Center>
                  <Icon name="dollar" size={30} color="white" />
                  <Text color="white" fontSize={14}>Earning</Text>
                </Center>
              </Link>
            </Pressable>
          </HStack>
        </Box>

        <Route exact path="/" component={Home} />
        <Route path="/livevideo" component={LiveVideo} />
        <Route path="/upload" component={Upload} />
        <Route path="/earning" component={Earning} />
      </NativeBaseProvider>

    </NativeRouter >
  );
}
