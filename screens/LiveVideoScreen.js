import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LiveVideoScreen = () => {
    return (
        <View style={styles.container}>
            <Text>LiveVideo Screen</Text>
            <Button
                title="Click here"
                onPress={() => alert('Button Clicked!')}
            />
        </View>
    );
};

export default LiveVideoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})