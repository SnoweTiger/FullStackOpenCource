import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';

const styles = StyleSheet.create({
    container: {
        // marginTop: Constants.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8',
        // fontFamily: 'Arial',
        fontFamily: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
    }),
    },
    
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<RepositoryList />} exact />
                <Route path="/sigin" element={<SignIn />} exact />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
      
        // <View style={styles.container}>
        //     <AppBar/>
        //   <Text>Rate Repository Application</Text>
        //   <RepositoryList/>
        // </View>
  );
};

export default Main;