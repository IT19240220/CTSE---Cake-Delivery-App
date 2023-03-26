import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {doc, updateDoc, addDoc} from 'firebase/firestore'
// import {authDB} from '../FirebaseDB'
import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');

    function loginDB() {
        auth().createUserWithEmailAndPassword(username, password).then((val) => {
            console.log(val)
            navigation.navigate('Login')
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{marginTop: 50}}>Enter Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />

            <Text style={{marginTop: 10}}>Enter Password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />

            <Text style={{marginTop: 10}}>Enter User Type</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUserType}
                value={userType}
            />

            <View style={{marginTop: 80}}>
                <Button
                    title="Sign Up"
                    onPress={() => {
                        loginDB()
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft: 10, marginRight: 10,
    },
    input: {
        height: 40,
        // margin: 12,
        // marginBottom: 80,
        borderWidth: 1,
        padding: 10,
    },
});
