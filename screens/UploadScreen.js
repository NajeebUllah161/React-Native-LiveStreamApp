import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const UploadScreen = () => {

    const [image, setImage] = useState('https://source.unsplash.com/collection/190727');

    const selectPhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
        }).then(image1 => {
            console.log(image1);
            setImage(image1.path);
        });
    }

    const selectPhotoFromGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image1 => {
            console.log(image1);
            setImage(image1.path);
        });

    }

    return (
        <View style={styles.container}>
            <Text>LiveVideo Screen</Text>
            <View style={styles.space} />

            <Button
                title="Open Camera"
                onPress={selectPhotoFromCamera}
            />

            <View style={styles.space} />

            <Button
                title="Select From Gallery"
                onPress={selectPhotoFromGallery}
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
                        uri: image,
                    }}
                    style={{ height: 300, width: 300 }}
                    imageStyle={{ borderRadius: 15 }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {/* <Icon
                            name="camera"
                            size={35}
                            color="#fff"
                            style={{
                                opacity: 0.7,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 10,
                            }}
                        /> */}
                    </View>
                </ImageBackground>
            </View>

        </View>
    );
};

export default UploadScreen;

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
})
