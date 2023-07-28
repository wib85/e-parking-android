import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Linking } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';


import Home from './Home';
import Scan from './Scan';
import History from './History';
import Setting from './Setting';


import AsyncStorage from '@react-native-async-storage/async-storage';


import { SessionContext } from '../SessionContext';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Tab = createBottomTabNavigator();

const MyTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : (options.title !== undefined ? options.title : route.name);

                const Ico = options.tabBarIcon;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({
                            name: route.name,
                            merge: true
                        });
                    }
                }

                return (<TouchableOpacity
                    accessibilityRole="button"
                    accessibilityState={isFocused ? { selected: true } : {}}
                    accessibilityLabel={options.tabBarAccessibilityLabel}
                    testID={options.tabBarTestID}
                    key={index}
                    onPress={onPress}
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        elevation: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 5
                    }}
                >
                    <View>
                        <Icon name={options.tabBarIcon} size={25} color={isFocused ? '#535354' : '#bdbdbd'} />
                    </View>
                    <Text style={{ color: isFocused ? '#535354' : '#bdbdbd', textAlign: 'center' }}>
                        {label}
                    </Text>
                </TouchableOpacity>);
            })}
        </View>
    );
};

const Menu = ({ navigation }) => {
    const [session, setSession] = useState({});

    useEffect(() => {
        const getSession = async () => {
            await AsyncStorage.getItem("session").then(value => {
                if (!value) {
                    navigation.navigate("Login");
                    return;
                }
                setSession(JSON.parse(value));
            });
        }

        getSession();
    }, []);

    return (
        <>
            <StatusBar backgroundColor={'#622398'} barStyle='light-content' />
            <SessionContext.Provider value={session}>
                <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />} initialRouteName='Home'>
                    <Tab.Screen name="Home" component={Home} options={{
                        tabBarIcon: 'home',
                        title: 'e-PARKING',
                        headerShown: false
                    }} />
                    <Tab.Screen name="Scan" component={Scan} options={{
                        tabBarIcon: 'camera',
                        headerShown: false,
                        tabBarStyle: {
                            backgroundColor: '#000'
                        }
                    }} />
                    <Tab.Screen name="History" component={History} options={{
                        tabBarIcon: 'clock-o',
                    }} />
                    <Tab.Screen name="Setting" component={Setting} options={{
                        tabBarIcon: 'cogs',
                    }} />
                </Tab.Navigator>
            </SessionContext.Provider>
        </>
    );
};

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});

export default Menu;
