import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const DemoUploadScreen = () => {

  const [filePath, setFilePath] = useState('https://source.unsplash.com/collection/190727');

  const captureImage = (type) => {
    launchCamera({
      mediaType: type,
      maxWidth: 300,
      maxHeight: 300,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    }, (response) => {
      console.log("Image is",response.assets[0].uri);
      setFilePath(response.assets[0].uri);
    });

  }

  const chooseFile = (type) => {
    launchImageLibrary({
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    }, (response) => {
      console.log(response.assets[0].uri);
      setFilePath(response.assets[0].uri);
    })


  }

  return (
    <View style={styles.container}>
      <Text>LiveVideo Screen</Text>
      <View style={styles.space} />

      <Button
        title="Open Camera"
        onPress={() => captureImage('photo')}
      />

      <View style={styles.space} />

      <Button
        title="Select From Gallery"
        onPress={() => chooseFile('photo')}
      />
      <View style={styles.space} />
      <View
        style={{
          marginTop: 120,
          height: 100,
          width: 100,
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={{
            uri: filePath,
          }}
          style={{ height: 300, width: 300 }}
          imageStyle={{ borderRadius: 15 }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
          </View>
        </ImageBackground>
      </View>

    </View>
  );
};

export default DemoUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 5,
    alignItems: 'center',
    marginTop: 30
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  }
});