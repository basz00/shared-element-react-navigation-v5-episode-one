import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
import Icon from '../components/Icon';
import MarketingSlider from '../components/MarketingSlider';
import {SPACING} from '../config/theme';
import {DATA} from '../config/travel';

const List = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1}}>
			<MarketingSlider />
			<View
				style={{
					flexDirection: 'row',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'center',
					marginVertical: 20,
				}}>
				{DATA.map((item) => {
					return (
						<TouchableOpacity
							key={item.id}
							style={{padding: SPACING}}
							onPress={() => navigation.push('Detail', {item})}>
							<SharedElement id={`item.${item.id}.icon`}>
								<Icon uri={item.imageUri} />
							</SharedElement>
						</TouchableOpacity>
					);
				})}
			</View>
		</SafeAreaView>
	);
};

export default List;
