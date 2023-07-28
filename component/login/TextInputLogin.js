import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, StatusBar, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TextInputLogin = (props) => {
    return (
        <View>
            <View style={{
				flexDirection: 'row',
				marginHorizontal: 25,
				marginTop: 10,
			}}>
				<View style={{
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#fff',
					width: 50,
					borderTopLeftRadius: 15,
					borderBottomLeftRadius: 15,
					elevation: 1
				}}>
					<Icon name={props.icon} size={30} color={'#bdbdbd'} />
				</View>
				<TextInput 
					value={props.value} 
					placeholder={props?.placeholder ?? ''}
					style={{
						backgroundColor: '#fff',
						flex: 1,
						borderTopRightRadius: 15,
						borderBottomRightRadius: 15,
						paddingVertical: 15,
						paddingLeft: 10,
						elevation: 1
					}} 
					secureTextEntry={props?.isPassword ?? false}
					onChangeText={text => props.setValue(text)}/>
			</View>
        </View>
    );
};

export default TextInputLogin;
