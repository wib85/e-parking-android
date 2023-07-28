import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';

import TextInputLogin from '../login/TextInputLogin.js';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import config from '../../config/config.js';
import { ActivityIndicator } from 'react-native';

const Login = ({ navigation }) => {

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	// SYNDUALITY : NOIR
	const doLogin = async () => {
		if (!username || !password) 
		{
			alert('Harap melengkapi username & password untuk login!');
			return;
		}

		await axios.post(config.login, {
			username,
			password
		}).then(async response => {
			console.log(response);

			const status_code = response?.status ?? 500,
			data = response?.data ?? [];

			if (status_code == 200 && (data?.status ?? false))
			{
				const token = data?.data?.token ?? '';
				const session = data?.data ?? {};

				await AsyncStorage.setItem("token", token);
				await AsyncStorage.setItem("session", JSON.stringify(session));

				navigation.replace("Menu");
			}
		})
		.catch(err => alert("Terjadi kesalahan, pastikan anda terhubung dengan internet & coba kembali!"));

		return false;
	};

	// const doLogin = () => navigation.navigate("Menu");

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={'#622398'} barStyle='light-content' />
			<View style={styles.box}>
				<Image source={require('../../asset/image/logo.png')} style={styles.logo} />
				<Text style={styles.logoText}>e-<Text style={{ color: '#622398', marginTop: 20 }}>PARKING</Text></Text>
				<Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 15 }}>Login</Text>
			</View>
			
			<TextInputLogin value={username} placeholder='Username' icon='user' setValue={setUsername} />
			<TextInputLogin value={password} placeholder='Password' icon='lock' setValue={setPassword} isPassword={true} />

			<TouchableOpacity style={{
				backgroundColor: '#622398', 
				marginTop: 20, 
				marginHorizontal: 25, 
				paddingVertical: 15, 
				borderRadius: 15,
				elevation: 2,
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
			}}
				onPress={doLogin}
			>
				<ActivityIndicator
					color='#fff'
					size='large'
					animating={loading}
					style={{
						height: 10,
						display: loading ? 'flex' : 'none'
					}}
				/>
				<Text style={{ 
					color: '#fff', 
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: 18,
				}}>Login</Text>
			</TouchableOpacity> 

			<View
				style={{
					marginHorizontal: 25,
					marginTop: 20,
					flexDirection: 'row',
					justifyContent: 'space-between',
					display: 'none'
				}}
			>
				<TouchableOpacity>
					<Text>Register</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text>Forgot Password ?</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EDECEC',
	},
	box: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 60,
	},
	logo: {
		width: 200,
		height: 200
	},
	logoText: {
		fontSize: 22,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		marginTop: 20
	}
});

export default Login;