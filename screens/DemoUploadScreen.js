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
            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);
            } else {
                if (type === 'photo') {
                    // console.log("Image is", response);
                    setFilePath(response.assets[0].uri);
                }
                else {
                    // console.log("Video is", response);
                    setFilePath(response.assets[0].uri);
                }

            }

        });
    }

    const chooseFile = (type) => {
        launchImageLibrary({
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        }, (response) => {
            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                alert('User tapped custom button: ', response.customButton);
            } else {
                if (type === 'photo') {
                    // console.log("Image is", response);
                    setFilePath(response.assets[0].uri);
                }
                else {
                    // console.log("Video is", response);
                    setFilePath(response.assets[0].uri);
                }

            }
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.space} />

            <Button
                title="Capture Photo"
                onPress={() => captureImage('photo')}
            />

            <View style={styles.space} />
            <Button
                title="Record Video"
                onPress={() => captureImage('video')}
            />

            <View style={styles.space} />
            <Button
                title="Select Photo From Gallery"
                onPress={() => chooseFile('photo')}
            />

            <View style={styles.space} />
            <Button
                title="Select Video From Gallery"
                onPress={() => chooseFile('video')}
            />
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