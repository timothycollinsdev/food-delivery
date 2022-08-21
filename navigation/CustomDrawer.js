import { StyleSheet, Image, Text, View } from 'react-native';
import React from 'react';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import { MainLayout } from '../screens';
import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	SIZES,
} from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerActions } from '@react-navigation/native';
import { useState } from 'react';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tabs/TabActions';
const Drawer = createDrawerNavigator();
const CustomDrawerItem = ({ icon, label, isFocused, onPress }) => {
	console.log({ isFocused });
	return (
		<TouchableOpacity
			style={{
				flexDirection: 'row',
				height: 40,
				marginBottom: SIZES.base,
				alignItems: 'center',
				paddingLeft: SIZES.radius,
				borderRadius: SIZES.base,
				backgroundColor: isFocused ? COLORS.transparentBlack1 : null,
			}}
			onPress={onPress}
		>
			<Image
				source={icon}
				style={{
					height: 20,
					width: 20,
					tintColor: COLORS.white,
				}}
			/>
			<Text
				style={{
					marginLeft: 15,
					color: COLORS.white,
					...FONTS.h3,
				}}
			>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

const CustomDrawerContent = ({ navigation, selectedtab, setSelectedTab }) => {
	return (
		<DrawerContentScrollView
			scrollEnabled
			contentContainerStyle={{
				flex: 1,
			}}
		>
			<View
				style={{
					flex: 1,
					paddingHorizontal: SIZES.radius,
				}}
			>
				{/* Close */}
				<View style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
					<TouchableOpacity
						onPress={() => navigation.closeDrawer()}
						style={{
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Image
							source={icons.cross}
							style={{
								height: 35,
								width: 35,
								tintColor: COLORS.white,
							}}
						/>
					</TouchableOpacity>
				</View>
				{/* Close */}

				{/* Profile */}
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						marginTop: SIZES.radius,
						alignItems: 'center',
					}}
				>
					<Image
						source={dummyData.myProfile.profile_image}
						style={{
							width: 50,
							height: 50,
							borderRadius: SIZES.radius,
						}}
					/>
					<View
						style={{
							marginLeft: SIZES.radius,
						}}
					>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.h3,
							}}
						>
							{dummyData.myProfile.name}
						</Text>
						<Text
							style={{
								color: COLORS.white,
								...FONTS.body4,
							}}
						>
							View Your Profile{' '}
						</Text>
					</View>
				</TouchableOpacity>

				{/* Profile */}

				<View
					style={{
						flex: 1,
						marginTop: SIZES.radius,
					}}
				>
					<CustomDrawerItem
						icon={icons.home}
						label={constants.screens.home}
						isFocused={selectedtab == constants.screens.home}
						onPress={() => {
							setSelectedTab(constants.screens.home);
							navigation.navigate('MainLayout');
						}}
					/>
					<CustomDrawerItem
						icon={icons.wallet}
						label={'My Wallet'}
						isFocused={selectedtab == 'My Wallet'}
						onPress={() => {
							setSelectedTab('My Wallet ');
							navigation.navigate('MainLayout');
						}}
					/>
					<CustomDrawerItem
						icon={icons.favourite}
						label={constants.screens.favourite}
						isFocused={selectedtab == constants.screens.favourite}
						onPress={() => {
							setSelectedTab(constants.screens.favourite);
							navigation.navigate('MainLayout');
						}}
					/>
					<CustomDrawerItem
						icon={icons.notification}
						label={constants.screens.notification}
						isFocused={selectedtab == constants.screens.notification}
						onPress={() => {
							setSelectedTab(constants.screens.notification);
							navigation.navigate('MainLayout');
						}}
					/>

					<View
						style={{
							height: 1,
							marginLeft: SIZES.radius,
							marginVertical: SIZES.radius,
							backgroundColor: COLORS.lightGray1,
						}}
					/>

					<CustomDrawerItem
						icon={icons.location}
						label={constants.screens.search}
					/>
					<CustomDrawerItem
						icon={icons.setting}
						label={constants.screens.search}
					/>
					<CustomDrawerItem
						icon={icons.coupon}
						label={constants.screens.main_layout}
					/>
					<CustomDrawerItem
						icon={icons.help}
						label={constants.screens.search}
					/>
				</View>
				<View style={{ marginBottom: SIZES.padding }}>
					<CustomDrawerItem icon={icons.logout} label={'LogOut'} />
				</View>
			</View>
		</DrawerContentScrollView>
	);
};

const CustomDrawer = ({ selectedtab, setSelectedTab }) => {
	const [progress, setProgress] = useState(new Animated.Value(0));

	const scale = Animated.interpolateNode(progress, {
		inputRange: [0, 1],
		outputRange: [1, 0.8],
	});
	const borderRadius = Animated.interpolateNode(progress, {
		inputRange: [0, 1],
		outputRange: [0, 26],
	});
	const animatedStyle = { borderRadius, transform: [{ scale }] };
	return (
		<View
			style={{
				backgroundColor: COLORS.primary,
				flex: 1,
			}}
		>
			<Drawer.Navigator
				drawerType='slide'
				overlayColor='transparent'
				drawerStyle={{
					flex: 1,
					width: '65%',
					paddingRight: 20,
					backgroundColor: 'transparent',
				}}
				sceneContainerStyle={{
					backgroundColor: 'transparent',
				}}
				initialRouteName='MainLayout'
				drawerContent={(props) => {
					setTimeout(() => {
						setProgress(props.progress);
					}, 0);
					return (
						<CustomDrawerContent
							navigation={props.navigation}
							selectedtab={selectedtab}
							setSelectedTab={setSelectedTab}
						/>
					);
				}}
			>
				<Drawer.Screen name='MainLayout'>
					{(props) => <MainLayout {...props} animatedStyle={animatedStyle} />}
				</Drawer.Screen>
			</Drawer.Navigator>
		</View>
	);
};
const mapStateToProps = (state) => {
	return { selectedtab: state.tabReducer.selectedtab };
};
const mapDispatchToProps = (dispatch) => {
	return {
		setSelectedTab: (selectedTab) => {
			console.log(selectedTab);
			return dispatch(setSelectedTab(selectedTab));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({});
