import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, { useEffect } from "react";
import { responsiveHeight } from "react-native-responsive-dimensions";
import CustomLoading from "./components/CustomLoading";
import { db } from "../../../FirebaseDB";
import {
  doc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";

const Advertisements = ({ navigation }) => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = React.useState(false);

  function getAdvertisements() {
    setLoading(true);

    onSnapshot(query(collection(db, "advertisements")), (querySnapshot) => {
      let tempadvertisements = [];

      querySnapshot.forEach((doc) => {
        tempadvertisements.push({
          id: doc.id,
          title: doc.data()["title"],
          description: doc.data()["description"],
          date: doc.data()["date"],
        });
      });
      setAdvertisements(tempadvertisements);
      setLoading(false);
    });
  }

  function deleteTodo(id) {
    setLoading(true);
    deleteDoc(doc(db, "advertisements", id)).then(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    getAdvertisements();
  }, []);

  const filterData = (advertisements, searchKey) => {
    const result = advertisements.filter((Advertisement) =>
      Advertisement.title.toLowerCase().includes(searchKey)
    );
    setAdvertisements(result);
  };

  const onSearch = async (e) => {
    onSnapshot(query(collection(db, "advertisements")), (querySnapshot) => {
      let tempadvertisements = [];

      querySnapshot.forEach((doc) => {
        tempadvertisements.push({
          id: doc.id,
          title: doc.data()["title"],
          description: doc.data()["description"],
          date: doc.data()["date"],
        });
      });
      filterData(tempadvertisements, e.toLowerCase());
    });
  };
  return (
    <>
      <SafeAreaView
        style={{
          marginBottom: 80,
        }}
      >
         <View style={styles.logOutContainer}>
          <TouchableOpacity
            onPress={() => navigation.push("Login")}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "80%",
            alignSelf: "center",
            height: "8%",
            marginTop: 20
          }}
        >
          <Text style={styles.header}>Advertisements</Text>
        </View>

        <View
          style={{
            width: "100%",
            height: "8%",
            paddingLeft: "2.5%",
            paddingRight: "2.5%",
          }}
        >
          <View style={{ flexDirection: "row", padding: "3%" }}>
            <View style={styles.searchContainer}>
              <Icon title="search" size={25} style={{ marginLeft: 20 }} />
              <TextInput
                placeholder="Search"
                style={styles.input}
                onChangeText={(text) => onSearch(text)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push("AddAdvertisement")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Add New Advertisement</Text>
        </TouchableOpacity>

        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            marginTop: "2.5%",
          }}
        >
          <View style={styles.container}>
            {advertisements.map((Advertisement) => (
              <TouchableOpacity
                key={Advertisement.id}
                onPress={() =>
                  navigation.push("AdvertisementDetails", {
                    id: Advertisement.id,
                    title: Advertisement.title,
                    description: Advertisement.description,
                    date: Advertisement.date,
                  })
                }
              >
                <View
                  id={Advertisement.id}
                  style={styles.AdvertisementContainer}
                >
                  <Image
                    source={{
                      uri: "https://www.bootdey.com/image/280x280/00BFFF/000000",
                    }}
                    style={styles.AdvertisementImage}
                  />
                  <View
                    style={{
                      width: "50%",
                      height: "100%",
                      justifyContent: "center",
                      marginLeft: "5%",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginTop: "-25%",
                      }}
                    >
                      {Advertisement.title}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "gray",
                        marginTop: 1,
                      }}
                    >
                      Published - {Advertisement.date}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        width: "25%",
                        flexDirection: "row",
                        alignContent: "center",
                        alignSelf: "center",
                        marginLeft: "-75%",
                        marginTop: "10%",
                        marginBottom: "-25%",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          navigation.push("EditAdvertisement", {
                            id: Advertisement.id,
                            title: Advertisement.title,
                            description: Advertisement.description,
                            date: Advertisement.date,
                          });
                        }}
                        style={{
                          backgroundColor: "blue",
                          paddingLeft: 10,
                          paddingRight: 10,
                          alignContent: "center",
                          alignSelf: "center",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Edit
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Delete Advertisement",
                            "Are you sure you want to delete this Person?",
                            [
                              {
                                text: "OK",
                                onPress: () => deleteTodo(Advertisement.id),
                              },
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                              },
                            ]
                          );
                        }}
                        style={{
                          marginLeft: 5,
                          backgroundColor: "red",
                          width: 60,
                          paddingLeft: 10,
                          paddingRight: 10,
                          alignContent: "center",
                          alignSelf: "center",
                          borderRadius: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                          }}
                        >
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      {loading ? <CustomLoading /> : null}
    </>
  );
};

export default Advertisements;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "5%",
    paddingBottom: 200,
  },
  logoutButton: {
    width: 100,
    backgroundColor: "white",
    padding: 7,
    borderRadius: 9,
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 1,
    shadowOpacity: 1,
    shadowRadius: 5,
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "6%",
  },
  logOutContainer: {
    position: "absolute",
    marginTop: 10,
    marginLeft: "70%",
  },
  logoutText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutBtn: {
    color: "red",
    fontSize: 15,
  },

  arrowHeader: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  AdvertisementContainer: {
    width: "100%",
    height: responsiveHeight(15),
    backgroundColor: "white",
    marginBottom: "5%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  AdvertisementImage: {
    width: "40%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 10,
    alignContent: "center",
    alignSelf: "center",
    marginLeft: "5%",
  },

  searchContainer: {
    height: responsiveHeight(6),
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "black",
    marginLeft: 10,
  },
  loginButton: {
    width: "50%",
    backgroundColor: "blue",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "white",
    minHeight: 50,
    marginLeft: "45%",
  },

  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
