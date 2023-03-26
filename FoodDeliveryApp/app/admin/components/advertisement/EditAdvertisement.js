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
import { doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../FirebaseDB";

const EditAdvertisement = ({ route, navigation }) => {
  const [uptitle, setuptitle] = useState("");
  const [update, setupdate] = useState("");
  const [updescription, setupdescription] = useState("");
  const [loading, setLoading] = React.useState(false);

  const { id, title, description, date } = route.params;

  useEffect(() => {
    setuptitle(title);
    setupdate(date);
    setupdescription(description);
  }, []);

  function updateDelivery() {
    setLoading(true);

    updateDoc(doc(db, "advertisements", id), {
      title: uptitle,
      date: update,
      description: updescription,
    }).then(() => {
      setLoading(false);
      navigation.push("Advertisements");
    });
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
      >
        <View style={styles.arrowHeader}>
          <Icon
            title="arrow-back"
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
          <Text style={styles.header}>Edit Advertisement</Text>
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
                  placeholder="title"
                  value={uptitle}
                  onChangeText={setuptitle}
                />
                <CustomTextInput
                  placeholder="Company ID"
                  value={update}
                  onChangeText={setupdate}
                />
                <TextInput
                  style={styles.textArea}
                  placeholder="Advertisement Description"
                  multiline={true}
                  numberOfLines={20}
                  value={updescription}
                  onChangeText={(text) => setupdescription(text)}
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

export default EditAdvertisement;

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
    paddingBottom: 326,
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
