import React, { useRef, useState, useEffect } from "react";
const { height, width } = Dimensions.get("window");

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { useRoute } from "@react-navigation/native";
import CustomLoading from "./components/CustomLoading";

const post = {
  id: 1,
  title: "Advertisement title",
  image: "https://www.bootdey.com/image/280x280/00BFFF/000000",
  author: "Jane Doe",
  date: "January 1, 2020",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.",
};

const AdvertisementDetails = ({ route, navigation }) => {

  const { id, title, description, date } = route.params;
  const [loading, setLoading] = React.useState(false);


  const dataList = [
    {
      id: 1,
      title: "Advertisement title",
    },
    {
      id: 2,
      title: "Advertisement title",
      //url: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.meta}>
          <Text style={styles.date}>
            Published - {date}
          </Text>
        </View>
        <Image source={{ uri: post.image }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <ScrollView
            style={{
              width: "100%",
              height: responsiveHeight(22),
              marginTop: "2%",
            }}
          >
            <Text style={styles.content}>{description}</Text>
          </ScrollView>
        </View>
      </View>
      {loading ? <CustomLoading /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingLeft: 20,
    paddingTop: 20,
  },
  meta: {
    flexDirection: "row",
    marginBottom: 20,
    paddingLeft: 20,
  },
  author: {
    fontSize: 14,
    color: "#999",
    marginRight: 10,
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
  image: {
    width: "90%",
    height: 200,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    fontSize: 16,
    marginTop: 5,
    padding: 10,
  },
  detailsContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F1F1F1",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginTop: "20%",
  },
  video: {
    flex: 2,
    alignSelf: "stretch",
    borderRadius: 10,
  },
});

export default AdvertisementDetails;
