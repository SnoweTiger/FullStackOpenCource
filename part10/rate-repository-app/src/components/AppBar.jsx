import { View, StyleSheet, Text } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        zIndex: 50,
        backgroundColor: '#24292e',
        flexDirection: 'row',
    },
    text: {
        color: 'white',
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            {/* <Text>ddd</Text> */}
            <Link to="/">
                <Text style={styles.text}>Repositories</Text>
            </Link>
            <Link to="/sigin">
                <Text style={styles.text}>SigIn</Text>
            </Link>
        </View>
    )       
};

export default AppBar;
