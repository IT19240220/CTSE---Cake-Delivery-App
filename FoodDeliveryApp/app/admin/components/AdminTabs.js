import React from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Font Awesome Icons...
import { FontAwesome5 } from "@expo/vector-icons";
import { useRef } from "react";

//Deliveries
import Diliveries from "../delivery/Deliveries";
import AddDelvery from "../delivery/AddDelivery";
import EditDelvery from "../delivery/EditDeliver";
import DeliveryDetails from "../delivery/DeliveryDetails";

//Advertisements
import Advertisements from "../advertisement/Advertisements";
import AddAdvertisement from "../advertisement/AddAdvertisement";
import EditAdvertisement from "../advertisement/EditAdvertisement";
import AdvertisementDetails from "../advertisement/AdvertisementDetails";

const DeliveryStack = createNativeStackNavigator();
const AdvertisementStack = createNativeStackNavigator();

function DeliveriesStackScreen() {
  return (
    <DeliveryStack.Navigator>
      <DeliveryStack.Screen
        name="Diliveries"
        component={Diliveries}
        options={{
          headerShown: false,
        }}
      />

      <DeliveryStack.Screen
        name="AddDelvery"
        component={AddDelvery}
        options={{
          headerShown: false,
        }}
      />

      <DeliveryStack.Screen
        name="EditDelvery"
        component={EditDelvery}
        options={{
          headerShown: false,
        }}
      />

      <DeliveryStack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{
          headerShown: false,
        }}
      />
    </DeliveryStack.Navigator>
  );
}

function AdvertisementStackScreen() {
  return (
    <AdvertisementStack.Navigator>
      <AdvertisementStack.Screen
        name="Advertisements"
        component={Advertisements}
        options={{
          headerShown: false,
        }}
      />
      <AdvertisementStack.Screen
        name="AddAdvertisement"
        component={AddAdvertisement}
        options={{
          headerShown: false,
        }}
      />
      <AdvertisementStack.Screen
        name="EditAdvertisement"
        component={EditAdvertisement}
        options={{
          headerShown: false,
        }}
      />
      <AdvertisementStack.Screen
        name="AdvertisementDetails"
        component={AdvertisementDetails}
        options={{
          headerShown: false,
        }}
      />
    </AdvertisementStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function AdminTabs() {
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <Tab.Navigator
    screenOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 20,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 15,
          // Shadow...
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 10,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          paddingHorizontal: 20,
        },
      }}
    >
      {
        // Tab Screens....
        // Tab ICons....
      }
      <Tab.Screen
        name={"All Delivery People"}
        component={DeliveriesStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
              }}
            >
              <FontAwesome5
                name="home"
                size={22}
                color={focused ? "#2E2EFF" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 8,
              useNativeDriver: true,
            }).start();
          },
        })}
      ></Tab.Screen>

      <Tab.Screen
        name={"All Advertisements"}
        component={AdvertisementStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                position: "absolute",
              }}
            >
              <FontAwesome5
                name="newspaper"
                size={22}
                color={focused ? "#2E2EFF" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: (e) => {
            Animated.spring(tabOffsetValue, {
              toValue: 92,
              useNativeDriver: true,
            }).start();
          },
        })}
      ></Tab.Screen>

      {
        // Extra Tab Screen For Action Button..
      }
    </Tab.Navigator>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
