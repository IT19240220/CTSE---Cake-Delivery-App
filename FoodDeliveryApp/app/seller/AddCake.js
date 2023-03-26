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
import { doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../FirebaseDB";

export default function AddCake({ navigation }) {
  const [text, onChangeText] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function addCake() {
    if (text == "" || price == "" || description == "") {
      setError("Please fill all fields !!! ");
    } else {
      setDoc(doc(db, "foods", new Date().toString()), {
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
        <Text style={styles.topic}>Add Cake</Text>
        <Text style={{ marginTop: 10 }}>Enter Food</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <Text style={{ marginTop: 10 }}>Enter Price</Text>
        <TextInput style={styles.input} onChangeText={setPrice} value={price} />
        <Text style={{ marginTop: 10 }}>Enter Description</Text>
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
            color={"#0A3875"}
            title="Add Cake"
            onPress={() => {
              // console.log(45677)
              addCake();
            }}
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
    borderColor: "#094742",
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
  },
  topic: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 35,
    alignSelf: "center",
  },
});
