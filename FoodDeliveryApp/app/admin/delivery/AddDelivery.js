import {
  StyleSheet,
  Alert,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextInput from "./components/CustomTextInput";
import { doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../../FirebaseDB";
import CustomLoading from "./components/CustomLoading";

const AddDelvery = ({ navigation }) => {
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState("");

  function AddDelvery() {
    if (
      name == "" ||
      companyId == "" ||
      contactNo == "" ||
      email == "" ||
      address == ""
    ) {
      setError("Please fill all fields !!! ");
    } else {
      setLoading(true);
      setDoc(doc(db, "deliveries", new Date().toString()), {
        name: name,
        companyId: companyId,
        contactNo: contactNo,
        email: email,
        address: address,
      }).then(() => {
        setLoading(false);
        console.log("Success");
        navigation.push("Diliveries");
      });
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
      >
        <View style={styles.arrowHeader}>
          <Icon
            name="arrow-back"
            size={28}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
          }}
        >
          <Text style={styles.header}>Add Delvery Person</Text>
        </View>
        <ScrollView
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <View style={styles.container}>
            <View style={styles.textInputContainer}>
              <View style={styles.loginContainer}>
                <CustomTextInput placeholder="Name" onChangeText={setName} />
                <CustomTextInput
                  placeholder="Company ID"
                  onChangeText={setCompanyId}
                />
                <CustomTextInput
                  placeholder="Contact Number"
                  onChangeText={setContactNo}
                />
                <CustomTextInput placeholder="Email" onChangeText={setEmail} />
                <CustomTextInput
                  placeholder="Address"
                  onChangeText={setAddress}
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
                    onPress={AddDelvery}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>
                      Add Delvery Person
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {loading ? <CustomLoading /> : null}
    </>
  );
};

export default AddDelvery;

const styles = StyleSheet.create({
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: "4%",
    paddingBottom: 325,
    marginTop: "15%",
  },

  arrowHeader: {
    paddingHorizontal: "5%",
    marginTop: "12%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textInputContainer: {
    flex: 2,
    width: "90%",
    height: "100%",
    alignSelf: "center",
  },

  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: "5%",
  },

  textArea: {
    width: "100%",
    height: 200,
    backgroundColor: "white",
    padding: 10,
    marginBottom: "5%",
    textAlignVertical: "top",

    borderRadius: 10,
  },

  buttonContainer: {
    width: "50%",
    height: "20%",
    display: "flex",
    alignItems: "center",
    marginTop: responsiveHeight(1),
  },

  loginButton: {
    width: "100%",
    height: "30%",
    backgroundColor: "blue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    minHeight: 50,
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(3),
  },

  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  LogoImage: {
    width: responsiveWidth(80),
    height: responsiveHeight(28),
    resizeMode: "contain",
    marginTop: responsiveHeight(1),
    alignContent: "center",
    alignSelf: "center",
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "5%",
    marginBottom: "5%",
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
    fontSize: 15,
    textAlign: "center",
    fontWeight: "bold",
  },

  imageUploadField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "5%",
  },

  ImageTextInput: {
    width: "60%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    color: "gray",
  },

  uploadButton: {
    width: "38%",
    height: "30%",
    backgroundColor: "lightblue",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,

    marginLeft: responsiveWidth(2),
  },

  uploadTxt: {
    color: "black",
    fontWeight: "bold",
  },
  errorText: {
    width: "100%",
    marginLeft: "3%",
    color: "red",
    marginTop: "-4%",
    marginBottom: "3%",
    fontSize: 12,
    textAlign: "left",
  },
});
