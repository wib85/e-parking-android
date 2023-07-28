import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Linking } from 'react-native'
import { SessionContext } from '../SessionContext';


const Home = () => {
    const session = useContext(SessionContext);    

    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                backgroundColor: '#fff',
                paddingVertical: 20,
                marginHorizontal: 20,
                paddingHorizontal: 15,
                borderRadius: 15,
                marginTop: 20,
                elevation: 2
            }}>
                <Text style={{
                    fontWeight: 'bold',
                    fontSize: 15,
                    textTransform: 'uppercase'
                }}>
                    Selamat Datang
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderTopWidth: 1,
                    borderTopColor: '#bdbdbd',
                    borderStyle: 'dashed',
                    paddingTop: 20,
                    marginTop: 20
                }}>
                    <Text style={{
                        fontSize: 15,
                        flex: 1,
                        textTransform: 'uppercase'
                    }}>
                        {session.nama}
                    </Text>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 15,
                        flex: 1,
                        textAlign: 'right'
                    }}>
                        {session.nim}
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Home;
