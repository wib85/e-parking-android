import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Linking } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionContext } from '../SessionContext';
import axios from 'axios';
import config from '../../config/config';

const Scan = ({ navigation }) => {
    const session = useContext(SessionContext);
    const onSuccess = async (e) => {
        // Linking.openURL(e.data).catch(err => console.error(err));
        // alert(e.data);

        const token = session?.token ?? '';

        // console.log(e.data);

        const data = JSON.parse(e.data);

        await axios.post(config.scan, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(response => {
            const result = response?.data ?? {},
            error = result?.error ?? {},
            data = result?.data ?? {};
            
            if (Object.keys(error).length > 0)
            {
                if (error?.message == "Token has expired")
                {
                    navigation.replace("Login");
                    AsyncStorage.removeItem("session");
                    return;
                }
            }


            // alert(result?.status + result?.message);
            if (result?.status == "success")
            {
                // console.log(result);
                navigation.navigate("Home");
            }
        });
    };

    return (
        <View style={{
            flex: 1,
            height: 100,
            backgroundColor: '#000'
        }}>
            <QRCodeScanner
                onRead={onSuccess}
            />
        </View>
    );
};

export default Scan;