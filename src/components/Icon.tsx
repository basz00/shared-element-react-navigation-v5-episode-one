/* eslint-disable react-native/no-color-literals */
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {ICON_SIZE} from '../config/theme';

interface Props {
	uri: string;
}

const Icon = (props: Props) => {
	const {uri} = props;
	return (
		<View style={styles.imageContainer}>
			<Image source={{uri}} style={styles.image} />
		</View>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		width: ICON_SIZE,
		height: ICON_SIZE,
		borderRadius: ICON_SIZE / 2,
		backgroundColor: '#ddd',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: ICON_SIZE * 0.6,
		height: ICON_SIZE * 0.6,
		resizeMode: 'contain',
	},
});

export default Icon;
