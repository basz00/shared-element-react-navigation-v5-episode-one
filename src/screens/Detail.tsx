import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import {Animated} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SharedElement} from 'react-navigation-shared-element';
import BackIcon from '../components/BackIcon';
import Icon from '../components/Icon';
import {ICON_SIZE, SPACING, width} from '../config/theme';
import {Data, DATA} from '../config/travel';

const Detail = ({navigation, route}) => {
	const {item} = route.params;
	const ref = useRef<FlatList<any>>(null);
	const selectedItemIndex = DATA.findIndex((i) => i.id === item.id);
	const mountedAnimated = useRef(new Animated.Value(0)).current;
	const activeIndex = useRef(new Animated.Value(selectedItemIndex)).current;
	const activeIndexAnimation = useRef(new Animated.Value(selectedItemIndex))
		.current;

	const animation = (toValue, delay) =>
		Animated.timing(mountedAnimated, {
			toValue,
			duration: 500,
			delay,
			useNativeDriver: true,
		});

	useEffect(() => {
		Animated.parallel([
			Animated.timing(activeIndexAnimation, {
				toValue: activeIndex,
				duration: 300,
				useNativeDriver: true,
			}),
			animation(1, 1000),
		]).start();
	}, []);

	const size = ICON_SIZE + SPACING * 2;

	const translateY = mountedAnimated.interpolate({
		inputRange: [0, 1],
		outputRange: [50, 0],
	});

	const translateX = activeIndexAnimation.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [size, 0, -size],
	});

	return (
		<SafeAreaView style={{flex: 1}}>
			<BackIcon
				onPress={() => {
					animation(0).start(() => {
						navigation.goBack();
					});
				}}
			/>
			<Animated.View
				style={{
					flexDirection: 'row',
					flexWrap: 'nowrap',
					marginVertical: 20,
					marginLeft: width / 2 - ICON_SIZE / 2 - SPACING,
					transform: [{translateX}],
				}}>
				{DATA.map((item, index) => {
					const inputRange = [index - 1, index, index + 1];
					const opacity = activeIndexAnimation.interpolate({
						inputRange,
						outputRange: [0.3, 1, 0.3],
						extrapolate: 'clamp',
					});
					return (
						<TouchableOpacity
							style={{padding: SPACING}}
							key={item.id}
							onPress={() => {
								activeIndex.setValue(index);
								ref.current?.scrollToIndex({index, animated: true});
							}}>
							<Animated.View style={{alignItems: 'center', opacity}}>
								<SharedElement id={`item.${item.id}.icon`}>
									<Icon uri={item.imageUri} />
								</SharedElement>
								<Text style={{fontSize: 10}}>{item.title}</Text>
							</Animated.View>
						</TouchableOpacity>
					);
				})}
			</Animated.View>
			<Animated.FlatList
				style={{opacity: mountedAnimated, transform: [{translateY}]}}
				ref={ref}
				data={DATA}
				keyExtractor={(item: Data) => item.id}
				horizontal
				pagingEnabled
				initialScrollIndex={selectedItemIndex}
				nestedScrollEnabled
				getItemLayout={(_, index) => ({
					length: width,
					offset: width * index,
					index,
				})}
				showsHorizontalScrollIndicator={false}
				onMomentumScrollEnd={(event) => {
					const newIndex = Math.floor(
						event.nativeEvent.contentOffset.x / width,
					);
					activeIndex.setValue(newIndex);
				}}
				renderItem={({item}) => (
					<ScrollView
						style={{
							width: width - SPACING * 2,
							margin: SPACING,
							backgroundColor: 'rgba(0,0,0,0.05)',
							borderRadius: 16,
						}}>
						<View style={{padding: SPACING}}>
							<Text style={{fontSize: 16}}>
								{Array(50).fill(`${item.title} inner text \n`)}
							</Text>
						</View>
					</ScrollView>
				)}
			/>
		</SafeAreaView>
	);
};

Detail.sharedElements = (route, otherRoute, showing) => {
	return DATA.map((item) => {
		return {id: `item.${item.id}.icon`, animation: 'fade', resize: 'none'};
	});
};

export default Detail;
