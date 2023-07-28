import React, { useState, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login  from './component/screen/Login.js';
import Menu from './component/screen/Menu.js';
import SplashScreen from './component/SplashScreen.js';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='SplashScreen'>
				<Stack.Screen 
				name='SplashScreen'
				component={SplashScreen}
				options={{
					headerShown: false
				}}
				/>
				<Stack.Screen 
					name="Login" 
					component={Login} 
					options={{
						headerShown: false
					}}
				/>
				<Stack.Screen name="Menu" component={Menu} options={{
						headerShown: false,	
					}} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
