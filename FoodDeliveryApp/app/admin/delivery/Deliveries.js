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

const Diliveries = ({ navigation }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = React.useState(false);

  function setDeliveryPersons() {
    setLoading(true);

    onSnapshot(query(collection(db, "deliveries")), (querySnapshot) => {
      let tempDeliveries = [];

      querySnapshot.forEach((doc) => {
        tempDeliveries.push({
          id: doc.id,
          name: doc.data()["name"],
          companyId: doc.data()["companyId"],
          contactNo: doc.data()["contactNo"],
          email: doc.data()["email"],
          address: doc.data()["address"],
        });
      });
      setDeliveries(tempDeliveries);
      setLoading(false);
    });
  }

  function deleteTodo(id) {
    setLoading(true);
    deleteDoc(doc(db, "deliveries", id)).then(() => {
      setLoading(false);
    });
  }

  useEffect(() => {
    setDeliveryPersons();
  }, []);

  const filterData = (deliverys, searchKey) => {
    const result = deliverys.filter((Delivery) =>
      Delivery.name.toLowerCase().includes(searchKey)
    );
    setDeliveries(result);
  };

  const onSearch = async (e) => {
    onSnapshot(query(collection(db, "deliveries")), (querySnapshot) => {
      let tempDeliveries = [];

      querySnapshot.forEach((doc) => {
        tempDeliveries.push({
          id: doc.id,
          name: doc.data()["name"],
          companyId: doc.data()["companyId"],
          contactNo: doc.data()["contactNo"],
          email: doc.data()["email"],
          address: doc.data()["address"],
        });
      });
      filterData(tempDeliveries, e.toLowerCase());
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
            marginTop: 25,
          }}
        >
          <Text style={styles.header}>Delivery People</Text>
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
              <Icon name="search" size={25} style={{ marginLeft: 20 }} />
              <TextInput
                placeholder="Search"
                style={styles.input}
                onChangeText={(text) => onSearch(text)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.push("AddDelvery")}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Add New Delivery</Text>
        </TouchableOpacity>

        <ScrollView
          style={{
            width: "100%",
            height: "100%",
            marginTop: "2.5%",
          }}
        >
          <View style={styles.container}>
            {deliveries.map((Delivery) => (
              <TouchableOpacity
                key={Delivery.id}
                onPress={() =>
                  navigation.push("DeliveryDetails", {
                    id: Delivery.id,
                    name: Delivery.name,
                    companyId: Delivery.companyId,
                    contactNo: Delivery.contactNo,
                    email: Delivery.email,
                    address: Delivery.address,
                  })
                }
              >
                <View id={Delivery.id} style={styles.DeliveryContainer}>
                  <Image
                    source={{
                      uri: "https://www.bootdey.com/image/280x280/00BFFF/000000",
                    }}
                    style={styles.DeliveryImage}
                  />
                  <View
                    id={Delivery.id}
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
                      {Delivery.name}{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "gray",
                        marginTop: 1,
                      }}
                    >
                      Company ID - {Delivery.companyId}
                    </Text>
                    <View
                      id={Delivery.id}
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
                          navigation.push("EditDelvery", {
                            id: Delivery.id,
                            name: Delivery.name,
                            companyId: Delivery.companyId,
                            contactNo: Delivery.contactNo,
                            email: Delivery.email,
                            address: Delivery.address,
                          });
                        }}
                      >
                        <Icon name="edit" size={24} />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            "Delete Delivery",
                            "Are you sure you want to delete this Person?",
                            [
                              {
                                text: "OK",
                                onPress: () => deleteTodo(Delivery.id),
                              },
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                              },
                            ]
                          );
                        }}
                      >
                        <Icon
                          name="delete"
                          size={24}
                          color="red"
                          style={{
                            marginLeft: "5%",
                          }}
                        />
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

export default Diliveries;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: "5%",
    paddingBottom: 200,
  },
  logoutText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
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
  logOutContainer: {
    position: "absolute",
    marginTop: 10,
    marginLeft: "70%",
  },

  header: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "6%",
  },

  arrowHeader: {
    paddingHorizontal: "5%",
    marginTop: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  DeliveryContainer: {
    width: "100%",
    height: responsiveHeight(15),
    backgroundColor: "white",
    marginBottom: "5%",
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  DeliveryImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
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
