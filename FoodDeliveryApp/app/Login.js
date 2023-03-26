import {StatusBar} from 'expo-status-bar';
import {Button, TouchableOpacity, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView} from 'react-native';
import {useEffect, useState} from "react";
import {doc, updateDoc, addDoc} from 'firebase/firestore'
import {db} from '../FirebaseDB'
// import auth from '@react-native-firebase/auth';
import CustomTextInput from "./components/CustomTextInput";
import LoginImage from "./assets/images/Login.png";
import {
    responsiveHeight,
    responsiveWidth,
  } from "react-native-responsive-dimensions";
  import COLORS from "./assets/color";
export default function Login({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const admin = {
        username : "admin@gmail.com",
        pwd: "admin@123"
    }

    const seller = {
        username : "seller@gmail.com",
        pwd: "seller@123"
    }

    function loginDB() {
        if (username == "" || password == "") {
            setError("Please fill all fields !!! ");
          } else if ( username === admin.username && password === admin.pwd){
            navigation.navigate('AdminTabs')
        } else if(username === seller.username && password === seller.pwd) {
            navigation.navigate('ViewFoods')
        } else {
            navigation.navigate('ViewFoodsCustomer')
        }
    }

    return (
        <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
        >
          <View style={styles.container}>

            <View>
              <Image source={LoginImage} style={styles.LogoImage} />
            </View>
  
            <View style={styles.textInputContainer}>
              <Text style={styles.header}>Login</Text>
              <View style={styles.loginContainer}>
                <CustomTextInput placeholder="Email" onChangeText={setUsername} />
  
                <CustomTextInput
                  placeholder="Password"
                  secureTextEntry={true}
                  onChangeText={setPassword}
                />
                                {error ? (
                  <View
                    style={{
                      width: "100%",
                      height: 40,
                      backgroundColor: "red",
                      borderRadius: 10,
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {error}
                    </Text>
                  </View>
                ) : (
                  ""
                )}
  
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={loginDB}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
  
                <Text style={styles.signUpSen}>
                  New to Cake Delight?{"  "}
                  <Text
                    style={styles.signUpText}
                    onPress={() => navigation.push("SignUpScreen")}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        padding: "4%",
      },
    
      textInputContainer: {
        flex: 2,
        width: "80%",
        height: "100%",
        alignSelf: "center",
        marginTop: responsiveHeight(5),
      },
    
      textInput: {
        width: "100%",
        height: 50,
        backgroundColor: "white",
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: "5%",
      },
    
      buttonContainer: {
        width: "50%",
        height: "20%",
        display: "flex",
        alignItems: "center",
        marginTop: responsiveHeight(2),
      },
    
      loginButton: {
        width: "100%",
        height: "30%",
        backgroundColor: "green",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "white",
        minHeight: 50,
        marginBottom: responsiveHeight(3),
      },
    
      loginButtonText: {
        color: "white",
        fontWeight: "bold",
      },
    
      LogoImage: {
        width: responsiveWidth(80),
        height: responsiveHeight(35),
        resizeMode: "contain",
        marginTop: responsiveHeight(2),
        alignContent: "center",
        alignSelf: "center",
      },
    
      header: {
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
      },
      header1: {
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
        color:"blue",
        marginTop: responsiveHeight(3),
      },
    
      loginContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
      },
    
      signUpText: {
        color: "blue",
      },
    
      signUpSen: {
        marginTop:70,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
      },
});
