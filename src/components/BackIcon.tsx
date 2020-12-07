import React from 'react';
import {StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
	onPress: () => void;
}

const BackIcon = (props: Props) => {
	const {onPress} = props;
	return (
		<MaterialIcons
			name="arrow-back"
			size={24}
			color={'#333'}
			onPress={() => {
				onPress();
			}}
			style={styles.backIcon}
		/>
	);
};

const styles = StyleSheet.create({
	backIcon: {padding: 12},
});

export default BackIcon;
