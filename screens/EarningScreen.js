import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EarningScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Earning Screen</Text>
        </View>
    );
};

export default EarningScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})