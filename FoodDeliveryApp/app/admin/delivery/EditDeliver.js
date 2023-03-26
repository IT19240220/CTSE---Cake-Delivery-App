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
import React, { useState, useEffect } from "react";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextInput from "./components/CustomTextInput";
import CustomLoading from "./components/CustomLoading";
import {doc, setDoc, addDoc, updateDoc} from 'firebase/firestore'
import {db} from '../../../FirebaseDB'

const EditDelvery = ({ route, navigation }) => {
  const [upname, setupName] = useState("");
  const [upcompanyId, setupCompanyId] = useState("");
  const [upcontactNo, setupContactNo] = useState("");
  const [upemail, setupEmail] = useState("");
  const [upaddress, setupAddress] = useState("");
  const [loading, setLoading] = React.useState(false);

  const { id, name, companyId, contactNo, email, address } = route.params;

  useEffect(() => {
    setupName(name);
    setupCompanyId(companyId);
    setupContactNo(contactNo);
    setupEmail(email);
    setupAddress(address);
  }, []);

  function updateDelivery() {
    setLoading(true);

    updateDoc(doc(db, "deliveries", id), {
      name: upname,
      companyId: upcompanyId,
      contactNo: upcontactNo,
      email: upemail,
      address: upaddress,
    }).then(() => {
        setLoading(false);
        navigation.push("Diliveries" );
    });
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
          <Text style={styles.header}>Edit Delvery Person</Text>
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
                <CustomTextInput
                  placeholder="Name"
                  value={upname}
                  onChangeText={setupName}
                />
                <CustomTextInput
                  placeholder="Company ID"
                  value={upcompanyId}
                  onChangeText={setupCompanyId}
                />
                <CustomTextInput
                  placeholder="Contact Number"
                  value={upcontactNo}
                  onChangeText={setupContactNo}
                />
                <CustomTextInput
                  placeholder="Email"
                  value={upemail}
                  onChangeText={setupEmail}
                />
                <CustomTextInput
                  placeholder="Address"
                  value={upaddress}
                  onChangeText={setupAddress}
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                      onPress={updateDelivery}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginButtonText}>Update</Text>
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

export default EditDelvery;

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
