import axios from 'axios';
import config from '../../config/config';
import React, { useEffect } from 'react-native'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext, useState } from 'react';
import { SessionContext } from '../SessionContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputLogin from '../login/TextInputLogin';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logout: {
        flex: 1,
    }
});


const Setting = ({ navigation }) => {
    const session = useContext(SessionContext);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");

    const doLogout = async () => {
        await axios.post(config.logout, {}, {
            headers: {
                'Authorization': `Bearer ${session?.token}`
            }
        })
            .then(async response => {
                const status_code = response?.status ?? 500,
                    data = response?.data ?? [];

                if (status_code == 200 && (data?.status ?? false)) {
                    const token = data?.data?.token ?? '';
                    const session = data?.data ?? {};


                    await AsyncStorage.removeItem("token");
                    await AsyncStorage.removeItem("session");

                    navigation.replace("Login");
                }
            });
    };

    const doChangePassword = async () => {
        await axios.post(config.update, {
            old_password: oldPassword,
            password: newPassword,
            password_confirmation: confirmPassword
        }, {
            headers: {
                'Authorization': `Bearer ${session?.token}`
            }
        }).then(async response => {
            console.log(response);
            const status_code = response?.status ?? 500;

            if (status_code == 200 && (response?.data?.status ?? false)) {

                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("session");

                navigation.replace("Login");
            }
        });
    };

    return (
        <View style={{
            flex: 1,
            paddingVertical: 20,
            marginHorizontal: 20,
            justifyContent: 'space-between'
        }}>
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    paddingBottom: 20,
                    paddingTop: 10
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20
                    }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>Ganti Password</Text>
                    </View>
                    <TextInputLogin placeholder='Password Lama' icon='lock' isPassword={true} setValue={setOldPassword} />
                    <TextInputLogin placeholder='Password Baru' icon='lock' isPassword={true} setValue={setnewPassword} />
                    <TextInputLogin placeholder='Konfirmasi Password Baru' isPassword={true} icon='lock' setValue={setconfirmPassword} />

                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20
                    }}>
                        <Text style={{
                            fontWeight: 'normal',
                            fontSize: 10,
                            color: 'red'
                        }}>Mengganti password mengharuskan anda login kembali!</Text>
                    </View>

                    <TouchableOpacity style={{
                        backgroundColor: '#622398',
                        paddingVertical: 15,
                        borderRadius: 15,
                        elevation: 2,
                        alignItems: 'center',
                        marginTop: 25,
                        marginHorizontal: 20
                    }}
                        onPress={doChangePassword}
                    >
                        <Text style={{
                            color: '#fff',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}>
                            <Icon name='save' size={20} />
                            &nbsp;&nbsp;Simpan</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <TouchableOpacity style={{
                    backgroundColor: '#622398',
                    paddingVertical: 15,
                    borderRadius: 15,
                    elevation: 2,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
                    onPress={doLogout}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 18,
                    }}>
                        <Icon name='sign-out' size={20} />
                        &nbsp;&nbsp;Log Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Setting;
