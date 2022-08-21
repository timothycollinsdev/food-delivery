import React from 'react';
import { View, Text, Image } from 'react-native';
import {
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import Header from '../components/Header';
import {
	COLORS,
	constants,
	dummyData,
	FONTS,
	icons,
	SIZES,
} from '../constants';
import { setSelectedTab } from '../stores/tabs/TabActions';

const TabButton = ({ label, icon, isFocused, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Animated.View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Animated.View
					style={{
						flexDirection: 'row',
						width: '30%',
						height: 60,
						justifyContent: 'center',
						alignItems: 'center',
						// backgroundColor: 'pink',
						borderRadius: 25,
					}}
				>
					<Image
						source={icon}
						style={{
							width: 20,
							height: 20,
							tintColor: COLORS.gray,
						}}
					/>
					{isFocused && (
						<Text
							numberOfLines={1}
							style={{
								marginLeft: SIZES.base,
								color: COLORS.white,
								...FONTS.h3,
							}}
						>
							{label}
						</Text>
					)}
				</Animated.View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};
const MainLayout = ({
	animatedStyle,
	navigation,
	selectedTab,
	setSelectedTab,
}) => {
	return (
		<Animated.View
			style={{
				flex: 1,
				backgroundColor: 'white',
				...animatedStyle,
			}}
		>
			<Header
				containerStyle={{
					height: 50,
					paddingHorizontal: SIZES.padding,
					marginTop: 10,
					alignItems: 'center',
				}}
				title={selectedTab}
				leftComponent={
					<TouchableOpacity
						style={{
							width: 40,
							height: 40,
							alignItems: 'center',
							justifyContent: 'center',
							borderWidth: 1,
							borderColor: COLORS.gray2,
							borderRadius: SIZES.radius,
						}}
						onPress={navigation.openDrawer}
					>
						<Image source={icons.menu} />
					</TouchableOpacity>
				}
				rightComponent={
					<TouchableOpacity
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: SIZES.radius,
						}}
						onPress={() => {}}
					>
						<Image
							source={dummyData.myProfile.profile_image}
							style={{
								width: 40,
								height: 40,
								borderRadius: SIZES.radius,
							}}
						/>
					</TouchableOpacity>
				}
			/>
			<View
				style={{
					flex: 1,
				}}
			>
				<Text>MainLayout</Text>
			</View>

			<View
				style={{
					height: 100,
					// backgroundColor: 'pink',
					// flexDirection: 'row',
					// flexWrap: 'wrap',
				}}
			>
				<LinearGradient
					colors={[COLORS.transparent, COLORS.lightGray1]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 4 }}
					style={{
						position: 'absolute',
						top: -20,
						left: 0,
						right: 0,
						height: 100,
						borderTopLeftRadius: 15,
						borderTopRightRadius: 15,
					}}
				/>
				<View
					style={{
						flex: 1,
						flexDirection: 'row',
						paddingHorizontal: SIZES.radius,
						backgroundColor: COLORS.white,
						paddingBottom: 10,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						// width: '100%',
						// backgroundColor: 'green',
						// flexWrap: 'wrap',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<TabButton
						label={constants.screens.home}
						icon={icons.home}
						isFocused={selectedTab === constants.screens.home}
						onPress={() => setSelectedTab(constants.screens.home)}
					/>
					<TabButton
						label={constants.screens.search}
						icon={icons.search}
						isFocused={selectedTab === constants.screens.search}
						onPress={() => setSelectedTab(constants.screens.search)}
					/>
					<TabButton
						label={constants.screens.cart}
						icon={icons.cart}
						isFocused={selectedTab === constants.screens.cart}
						onPress={() => setSelectedTab(constants.screens.cart)}
					/>
					<TabButton
						label={constants.screens.favourite}
						icon={icons.favourite}
						isFocused={selectedTab === constants.screens.favourite}
						onPress={() => setSelectedTab(constants.screens.favourite)}
					/>
					<TabButton
						label={constants.screens.notification}
						icon={icons.notification}
						isFocused={selectedTab === constants.screens.notification}
						onPress={() => setSelectedTab(constants.screens.notification)}
					/>
				</View>
			</View>
		</Animated.View>
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
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
