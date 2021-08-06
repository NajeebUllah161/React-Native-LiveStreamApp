import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native';
import Video from 'react-native-video';
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';

const DemoUploadVideo = () => {

    //permissions
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalReadPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Read Permission',
                        message: 'App needs read permission',
                    },
                );
                // If READ_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Read permission err', err);
            }
            return false;
        } else return true;
    };


    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };




    //Methods
    const captureImage = async (type, display) => {
        setShowVideo(display);
        // console.log("showVideo is : ", display)

        //Check for permissions
        let isCameraPermitted = await requestCameraPermission();
        let isReadStoragePermitted = await requestExternalReadPermission();
        let isWriteStoragePermitted = await requestExternalWritePermission();

        if (isCameraPermitted && isReadStoragePermitted && isWriteStoragePermitted) {
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
                        console.log("Image is", response.assets[0].uri);
                        setShowPhoto(response.assets[0].uri);
                    }
                    else {
                        // console.log("Video is", response);
                        setVideo(response.assets[0].uri);
                    }

                }

            });
        }
    }

    const chooseFile = (type, display) => {
        setShowVideo(display);
        console.log("showVideo is :", display);
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
                    setShowPhoto(response.assets[0].uri);
                }
                else {
                    // console.log("Video is", response);
                    setVideo(response.assets[0].uri);
                }

            }
        });
    }

    //States
    const [showPhoto, setShowPhoto] = useState('https://source.unsplash.com/collection/190727');
    const [video, setVideo] = useState('https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4');
    const [showVideo, setShowVideo] = useState(true);
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');

    //Setting States
    const onSeek = (seek) => {
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoadStart = (data) => setIsLoading(true);

    const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

    // const onError = () => alert('Oh! ', error);

    // const exitFullScreen = () => {
    //     alert('Exit full screen');
    // };

    // const enterFullScreen = () => { };

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == 'content') setScreenType('cover');
        else setScreenType('content');
    };

    const renderToolbar = () => (
        <View>
            <Text style={styles.toolbar}> toolbar </Text>
        </View>
    );

    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    return (
        <View style={styles.container}>
            <View style={styles.space} />

            <Button
                title="Capture Photo"
                onPress={() => captureImage('photo', false)}
            />

            <View style={styles.space} />
            <Button
                title="Record Video"
                onPress={() => captureImage('video', true)}
            />

            <View style={styles.space} />
            <Button
                title="Select Photo From Gallery"
                onPress={() => chooseFile('photo', false)}
            />

            <View style={styles.space} />
            <Button
                title="Select Video From Gallery"
                onPress={() => chooseFile('video', true)}
            />
            <View style={styles.space} />
            {showVideo ?
                <View style={styles.container}>
                    <Video
                        onEnd={onEnd}
                        onLoad={onLoad}
                        onLoadStart={onLoadStart}
                        onProgress={onProgress}
                        paused={paused}
                        ref={videoPlayer}
                        resizeMode={screenType}
                        onFullScreen={isFullScreen}
                        resizeMode="cover"
                        source={{
                            uri:
                                video,
                        }}
                        style={styles.mediaPlayer}
                        volume={10}
                    />
                    <MediaControls
                        duration={duration}
                        isLoading={isLoading}
                        mainColor="#333"
                        onFullScreen={onFullScreen}
                        onPaused={onPaused}
                        onReplay={onReplay}
                        onSeek={onSeek}
                        onSeeking={onSeeking}
                        playerState={playerState}
                        progress={currentTime}
                        toolbar={renderToolbar()}
                    />
                </View>
                :
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
                            uri: showPhoto,
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
            }
        </View>

    );
};

export default DemoUploadVideo;

const styles = StyleSheet.create({
    container: {
        flex: 6,
        alignItems: 'center',
        marginTop: 30
    },
    space: {
        width: 20,
        height: 20,
    },
    mediaPlayer: {

        backgroundColor: 'black',
        justifyContent: 'center',
        width: 300,
        height: 300,
        alignSelf: 'center'
    }
});