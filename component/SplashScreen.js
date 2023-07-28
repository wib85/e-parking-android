import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const SplashScreen = ({ navigation }) => {
    const [ animating, setAnimating ] = useState(true);

    useEffect(() => {
        setTimeout(async () => {
            setAnimating(false);
            await AsyncStorage.getItem("token").then(val => navigation.replace( val === null ? 'Login' : 'Menu' )); 
            /* AsyncStorage.getItem("username").then((value) => {
                navigation.replace(
                    value === null ? 'Login' : 'Menu'
                );
            }); */
        }, 1500);
    }, []);

    return (<View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Image 
            source={require('../asset/image/logo.png')}
            style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
            }}
        />

        <ActivityIndicator
            animating={animating}
            color='#622398'
            size='large'
            style={{
                alignItems: 'center',
                height: 80
            }}
        />
    </View>);
};

export default SplashScreen;