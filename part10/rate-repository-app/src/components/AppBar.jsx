import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        zIndex: 50,
        backgroundColor: '#24292e',
    },
    text: {
        color: 'white',
    }
});

const AppBar = ({style}) => {
    return <View style={styles.container}>
      <Text style={styles.text}>Repositories</Text>
  </View>;
};

export default AppBar;
