import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainLayout from './navigation/CustomDrawer';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './stores/rootReducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));
const App = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName={'Home'}
				>
					<Stack.Screen name='Home' component={MainLayout} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
