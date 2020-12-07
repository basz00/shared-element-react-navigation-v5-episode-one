import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Easing} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import Detail from './screens/Detail';
import List from './screens/List';

enableScreens();

const Stack = createSharedElementStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="List" headerMode="none">
				<Stack.Screen name="List" component={List} />
				<Stack.Screen
					name="Detail"
					component={Detail}
					options={() => ({
						gestureEnabled: false,
						transitionSpec: {
							open: {
								animation: 'timing',
								config: {duration: 500, easing: Easing.inOut(Easing.ease)},
							},
							close: {
								animation: 'timing',
								config: {duration: 500, easing: Easing.inOut(Easing.ease)},
							},
						},
						cardStyleInterpolator: ({current: {progress}}) => {
							return {
								cardStyle: {
									opacity: progress,
								},
							};
						},
					})}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
