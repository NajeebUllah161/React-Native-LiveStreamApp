// React Native Video Library to Play Video in Android and IOS
// https://aboutreact.com/react-native-video/

// import React in our code
import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import all the components we are going to use
import { SafeAreaView } from 'react-native';

//Import React Native Video to play video
import Video from 'react-native-video';

//Media Controls to control Play/Pause/Seek and full screen
import
MediaControls, { PLAYER_STATES }
    from 'react-native-media-controls';

const DemoUploadVideo = () => {

    //Image
    const [filePath, setFilePath] = useState('https://source.unsplash.com/collection/190727');

    const captureImage = (type, display) => {
        setShowVideo(display);
        console.log("availibility is : ", display)
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
                    setVideo(response.assets[0].uri);
                }

            }

        });
    }

    const chooseFile = (type, display) => {
        setShowVideo(display);
        console.log("Display is :", display);
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
                    setVideo(response.assets[0].uri);
                }

            }
        });
    }


    //Video
    const [showVideo, setShowVideo] = useState(true);
    const [video, setVideo] = useState('https://assets.mixkit.co/videos/download/mixkit-countryside-meadow-4075.mp4');
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

    const onSeek = (seek) => {
        //Handler for change in seekbar
        videoPlayer.current.seek(seek);
    };

    const onPaused = (playerState) => {
        //Handler for Video Pause
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will progress continue even if it ends
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

    const onError = () => alert('Oh! ', error);

    const exitFullScreen = () => {
        alert('Exit full screen');
    };

    const enterFullScreen = () => { };

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
        width: 20, // or whatever size you need
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