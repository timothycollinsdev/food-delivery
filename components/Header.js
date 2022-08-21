import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FONTS } from '../constants';

const Header = ({ title, containerStyle, leftComponent, rightComponent }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				...containerStyle,
			}}
		>
			{leftComponent}
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text
					style={{
						...FONTS.h3,
					}}
				>
					{title || 'Home'}
				</Text>
			</View>

			{rightComponent}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({});
