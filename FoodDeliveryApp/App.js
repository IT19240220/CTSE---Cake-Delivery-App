import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/Login';
import ViewFoods from './app/seller/ViewFoods';
import UpdateFood from './app/seller/UpdateFood';
import AddFood from './app/seller/AddFood';
import SignUp from './app/SignUp';

//Buyer
import ViewFoodsCustomer from './app/buyer/ViewFoodsCustomer';
import AddCustomerDetails from './app/buyer/AddCustomerDetails';
import ViewCustomerOrder from './app/buyer/ViewCustomerOrder';
import UpdateCustomerDetails from './app/buyer/UpdateCustomerDetails';

import AdminTabs from './app/admin/components/AdminTabs';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Create Account' }}
        />

        {/* Customer */}
        <Stack.Screen
          name="ViewFoodsCustomer"
          component={ViewFoodsCustomer}
          options={{ title: 'Add Item' }}
        />

        <Stack.Screen
          name="AddCustomerDetails"
          component={AddCustomerDetails}
          options={{ title: 'Add Delivery Details' }}
        />

        <Stack.Screen
          name="ViewCustomerOrder"
          component={ViewCustomerOrder}
          options={{ title: 'My Orders' }}
        />

        <Stack.Screen
          name="UpdateCustomerDetails"
          component={UpdateCustomerDetails}
          options={{ title: 'Update Details' }}
        />

        {/* advertisement */}
         <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{
            headerShown: false,
          }}
          />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
