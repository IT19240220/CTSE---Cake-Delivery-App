import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { doc, setDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../../FirebaseDB";

export default function UpdateCakes({ route, navigation }) {
  const [text, onChangeText] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const { foodId, foodName, foodPrice, foofDes } = route.params;
  const [error, setError] = useState("");

  useEffect(() => {
    onChangeText(foodName);
    setPrice(foodPrice);
    setDescription(foofDes);
  }, []);

  function updateCake() {
    if (text == "" || price == "" || description == "") {
      setError("Please fill all fields !!! ");
    } else {
      updateDoc(doc(db, "foods", foodId), {
        name: text,
        price: price,
        description: description,
      }).then(() => {
        // console.log(456)
        navigation.navigate("ViewFoods");
      });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginTop: 100 }}>
        <Text style={styles.topic}>Update Cake</Text>
        <Text style={{ marginTop: 5, marginBottom: 10 }}>Enter Item Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={{ marginTop: 10, marginBottom: 10 }}>Enter Price</Text>
        <TextInput style={styles.input} onChangeText={setPrice} value={price} />
        <Text style={{ marginTop: 10, marginBottom: 10 }}>
          Enter Description
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setDescription}
          value={description}
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
        <View style={{ marginTop: 30 }}>
          <Button
            title="Update Cake"
            onPress={() => {
              // console.log(45677)
              updateCake();
            }}
            color={"#0A3875"}
            width="10px"
            style={{}}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderRadius: 5,
    alignContent: "center",
    borderColor: "#101DA4",
    // margin: 12,
    marginBottom: 10,
    borderWidth: 1,
    padding: 1,
  },
  button: {
    color: "#C71585",
    marginTop: 70,
    padding: 10,
    borderRadius: 15,
    alignSelf: "center",
  },
  topic: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 35,
    alignSelf: "center",
    fontStyle: "bold",
  },
});
